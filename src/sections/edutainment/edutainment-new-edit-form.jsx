import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react'; // Combined import

import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';
import { CreateEdutainment , UpdateEdutainment } from 'src/api/edutainment';

// API and Services

// Form Components
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';
import SchoolsDropdown from './schools-dropdown';

// ----------------------------------------------------------------------

export default function EdutainmentNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    feed_type: Yup.string().required('Type is required'),
    heading: Yup.string().required('Please upload Image'),
    image: Yup.mixed(),
    video: Yup.mixed(),
    youtube_video: Yup.mixed(),
    duration: Yup.string(),
    status: Yup.string(),
    language: Yup.string().required('Language is required'),
    description: Yup.string().required('Description is required'),
    school_ids: Yup.array().of(Yup.string()).min(1, 'At least one school is required'),
  });

  const defaultValues = useMemo(
    () => ({
      heading: currentEdutainment?.heading || '',
      feed_type: currentEdutainment?.feed_type || '',
      image: currentEdutainment?.image || '',
      video: currentEdutainment?.video || '',
      youtube_video: currentEdutainment?.youtube_video || '',
      duration: currentEdutainment?.duration || 0,
      language: currentEdutainment?.language || '',
      description: currentEdutainment?.description || '',
      school_ids: currentEdutainment?.school_ids || [],
    }),
    [currentEdutainment]
  );

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

    const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'background.paper',
      '& fieldset': {
        borderColor: 'grey.300',
      },
      '&:hover fieldset': {
        borderColor: 'grey.400',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
  };

  const onSubmit = handleSubmit(async (data) => {
    // Conditional validation
    if (data.feed_type === 'Image' && !data.image) {
      enqueueSnackbar('Image is required when feed type is Image', { variant: 'error' });
      return;
    }

    if (data.feed_type === 'Video' && !data.video) {
      enqueueSnackbar('Video is required when feed type is Video', { variant: 'error' });
      return;
    }

    if (data.feed_type === 'Youtube video' && !data.youtube_video) {
      enqueueSnackbar('YouTube video link is required when feed type is Youtube video', {
        variant: 'error',
      });
      return;
    }

    try {
      const payload = {
        ...data,
        image: data.image || null,
        video: data.video || null,
        youtube_video: data.youtube_video || null,
      };

      // Only set status if it's a new record
      if (!currentEdutainment) {
        payload.status = 'Pending';
      }

      const response = currentEdutainment
        ? await UpdateEdutainment({ ...payload, id: currentEdutainment.id })
        : await CreateEdutainment(payload);

      if (response?.success) {
        enqueueSnackbar(
          currentEdutainment
            ? 'Edutainment updated successfully!'
            : 'Edutainment created successfully!',
          {
            variant: 'success',
          }
        );
        router.push(paths.dashboard.edutainment.root);
        reset();
      } else {
        enqueueSnackbar('Operation failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error while submitting:', error);
      enqueueSnackbar('Something went wrong. Please check your inputs.', { variant: 'error' });
    }
  });

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const payload = {
          files: file,
        };
        const response = await request.UploadFiles(payload);

        if (response.success) {
          return response.data[0].file_url;
        }
        throw new Error('Upload failed');
      } catch (error) {
        enqueueSnackbar('File upload failed', { variant: 'error' });
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [enqueueSnackbar]
  );

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        // Check file type (image or video) and set the corresponding value
        if (file.type.startsWith('image/')) {
          setValue('image', fileWithPreview);
          const uploadedUrl = await handleUpload(file);
          if (uploadedUrl) {
            setValue('image', uploadedUrl);
            enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
          }
        } else if (file.type.startsWith('video/')) {
          setValue('video', fileWithPreview);
          const uploadedUrl = await handleUpload(file);
          if (uploadedUrl) {
            setValue('video', uploadedUrl);
            enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
          }
        } else {
          enqueueSnackbar('Unsupported file type', { variant: 'error' });
        }
      }
    },
    [setValue, enqueueSnackbar, handleUpload]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('image', null); // Remove the image
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('image', null); // Reset to no image
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                {/* Type Dropdown */}
                <Box
                  columnGap={2}
                  rowGap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)', // Single column on small screens
                    md: 'repeat(2, 1fr)', // Three columns on medium and up
                  }}
                >
                  <RHFSelect name="feed_type" label="Type"  sx={fieldStyles}>
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="Image">Image</MenuItem>
                    <MenuItem value="Video">Video</MenuItem>
                    <MenuItem value="Youtube video">YouTube</MenuItem>
                  </RHFSelect>

                  {currentEdutainment && (
                    <RHFSelect name="status" label="Status"  sx={fieldStyles}>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </RHFSelect>
                  )}
                </Box>

                {/* Language, Heading, Description */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={2}>
                    <RHFSelect name="language" label="Language"  sx={fieldStyles}>
                      <MenuItem value="Telugu">Telugu</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                    </RHFSelect>
                    <RHFTextField name="heading" label="Heading" />
                    <RHFTextField name="description" label="Description" multiline rows={4} />
                  </Stack>
                </Box>

                {/* Schools Dropdown */}
                <Box>
                  <Typography variant="subtitle2" >Select Schools</Typography>
                  <SchoolsDropdown
                    value={values.school_ids}
                    onChange={(selectedSchools) => setValue('school_ids', selectedSchools)}
                  />
                </Box>

                {/* Conditionally Render Image Field */}
                {(values.feed_type === 'Image' ||
                  values.feed_type === 'Video' ||
                  values.feed_type === 'Youtube video') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    {/* Image Field */}
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Image</Typography>
                      <RHFUpload
                        thumbnail
                        name="image"
                        //  maxSize={10 * 1024 * 1024}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        isLoading={isUploading}
                      />
                    </Stack>
                  </Box>
                )}

                {values.feed_type === 'Video' && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    {/* Video Field */}
                    {/* <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Video</Typography>
                      <RHFUpload
                        thumbnail
                        name="video"
                        // maxSize={15 * 1024 * 1024}// Adjust the max size as per your requirement
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        isLoading={isUploading}
                        accept="video/*" // Allows only video files
                      />
                    </Stack> */}
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Video</Typography>
                      <RHFUpload
                        thumbnail
                        name="video"
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        isLoading={isUploading}
                        accept="video/*"
                      />
                      {values.video && typeof values.video === 'string' && (
                        <Box mt={1}>
                          <video
                            src={values.video}
                            controls
                            style={{ maxWidth: '100%', maxHeight: 300 }}
                          >
                            <track kind="captions" srcLang="en" label="English captions" />
                          </video>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                )}

                {values.feed_type === 'Youtube video' && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Youtube Video</Typography>
                      <RHFTextField name="youtube_video" label="Video URL or ID"  sx={fieldStyles} />
                    </Stack>
                  </Box>
                )}

                {values.feed_type === 'Video' && (
                  <Box>
                    <RHFTextField
                      name="duration"
                      label="Duration (in seconds)"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }} 
                       sx={fieldStyles}// Restrict to non-negative values
                    />
                  </Box>
                )}
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Edutainment' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

EdutainmentNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
