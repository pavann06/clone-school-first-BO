import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
// import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react'; // Combined import

import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';

import { CreateLesson, UpdateLesson } from 'src/api/lessons';
import OnlineCourseDropdown from './online-courses-dropdown';
import ChapterDropdown from './chapters-dropdown';

// API and Services

// Form Components

// ----------------------------------------------------------------------

export default function LessonsNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    lesson_type: Yup.string().required('Type is required'),
    lesson_name: Yup.string(),
    lesson_number: Yup.string(),
    chapter_number: Yup.string(),
    lesson_image: Yup.mixed(),
    video: Yup.mixed(),
    mcq_count: Yup.string(),

    duration: Yup.string(),
    total_marks: Yup.string(),

    mcq: Yup.boolean().required('Single video is required'),

    description: Yup.string().required('Description is required'),
    course_id: Yup.string(),
    chapter_id: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      lesson_name: currentEdutainment?.lesson_name || '',
      lesson_type: currentEdutainment?.lesson_type || '',
      lesson_image: currentEdutainment?.lesson_image || '',
      lesson_number: currentEdutainment?.lesson_number || '',
      chapter_number: currentEdutainment?.chapter_number || '',
      video: currentEdutainment?.video || '',

      duration: currentEdutainment?.duration || 0,

      description: currentEdutainment?.description || '',

      mcq: currentEdutainment?.single_video || false,
      mcq_count: currentEdutainment?.mcq_count || '',
      course_id: currentEdutainment?.course_id || '',
      chapter_id: currentEdutainment?.chapter_id || '',
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        lesson_image: data.lesson_image || null,
        video: data.video || null,
        youtube_video: data.youtube_video || null,
      };

      if (!currentEdutainment) {
        payload.status = 'Pending';
      }

      const response = currentEdutainment
        ? await UpdateLesson({ ...payload, id: currentEdutainment.id })
        : await CreateLesson(payload);

      console.log('Full API Response:', response); // Debugging

      if (response?.success) {
        enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.lessons.root);
        reset();
        return response;
      }

      const errors = response?.response?.data?.data;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          if (methods.setError) {
            methods.setError(field, {
              type: 'server',
              message: messages[0],
            });
          }
        });
        enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
        return null;
      }

      enqueueSnackbar('Operation failed');
      return response;
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Operation failed');
      return null;
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
          setValue('lesson_image', fileWithPreview);
          const uploadedUrl = await handleUpload(file);
          if (uploadedUrl) {
            setValue('lesson_image', uploadedUrl);
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
    setValue('lesson_image', null); // Remove the image
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('lesson_image', null); // Reset to no image
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

                {/* Language, Heading, Description */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={2}>
                    <RHFTextField name="lesson_name" label="Lesson Name" />
                    <RHFTextField name="description" label="Description" multiline rows={4} />
                  </Stack>
                </Box>

                <RHFTextField name="lesson_type" label="Lesson Type" />

                <RHFTextField name="lesson_number" label="Lesson Number" type="number" />
                <RHFTextField name="chapter_number" label="Chapter Number" type="number" />

                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  {/* Image Field */}
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Lesson Image</Typography>
                    <RHFUpload
                      thumbnail
                      name="lesson_image"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      isLoading={isUploading}
                    />
                  </Stack>
                </Box>

                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  {/* Video Field */}
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Video</Typography>
                    <RHFUpload
                      thumbnail
                      name="video"
                      maxSize={3145728} // Adjust the max size as per your requirement
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      isLoading={isUploading}
                      accept="video/*" // Allows only video files
                    />
                  </Stack>
                </Box>

                <Box>
                  <RHFTextField
                    name="duration"
                    label="Duration (in seconds)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
                  />
                </Box>
              </Box>

              <Controller
                name="mcq"
                control={methods.control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Is It MCQ?"
                  />
                )}
              />

              <Box>
                <RHFTextField
                  name="total_marks"
                  label="Total Marks"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
                />
              </Box>

              <Box>
                <RHFTextField
                  name="mcq_count"
                  label="MCQ Count"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Select Course
                </Typography>
                <Controller
                  name="course_id"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <OnlineCourseDropdown value={field.value} onChange={field.onChange} />
                      {error && (
                        <Typography variant="caption" color="error">
                          {error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Select Chapter
                </Typography>
                <Controller
                  name="chapter_id"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <ChapterDropdown value={field.value} onChange={field.onChange} />
                      {error && (
                        <Typography variant="caption" color="error">
                          {error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Lesson' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

LessonsNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
