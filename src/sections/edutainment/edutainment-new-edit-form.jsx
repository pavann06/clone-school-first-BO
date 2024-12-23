

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import React, {  useMemo, useCallback  } from 'react'; // Combined import

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
import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';
import { useSnackbar } from 'notistack';

// API and Services


// Form Components
import FormProvider, { RHFUpload,RHFSelect, RHFTextField } from 'src/components/hook-form';
import { status } from 'nprogress';

// ----------------------------------------------------------------------

export default function EdutainmentNewEditForm({ currentEdutainment }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const EdutainmentSchema = Yup.object().shape({
    feed_type: Yup.string().required('Type is required'),
    heading: Yup.string().required('Heading is required'),
    image: Yup.mixed(),
    video: Yup.mixed(),
    duration: Yup.string(),
    status : Yup.string().required('Status is required'),
    language: Yup.string().required('Language is required'),
    description: Yup.string().required('Description is required'),
    posting_date: Yup.string().required('Posting date is required'),
  });
  
  

  const defaultValues = useMemo(
    () => ({
      heading: currentEdutainment?.heading || '',
      feed_type: currentEdutainment?.feed_type || '',
      image: currentEdutainment?.image || '',
      video: currentEdutainment?.video || '',
      duration: currentEdutainment?.duration ||'',
      language: currentEdutainment?.language || '',
      description: currentEdutainment?.description || '',
      posting_date: currentEdutainment?.posting_date || '',
      status: currentEdutainment?.status || '',
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
      // if update product
      let response = {};
      if (currentEdutainment) {
        data.id = currentEdutainment.id;
        response = await UpdateEdutainment(data);
      }
      // if create product
      else {
        response = await CreateEdutainment(data);
      }

      // product creation success
      if (response && response.success) {
        enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!');
        reset();
        // invalidate cache
        queryClient.invalidateQueries(['edutainment']);

        // redirect to product list
        router.push(paths.dashboard.edutainment.root);
        return response;
      }
      enqueueSnackbar('Feeds Create failed!');

      return response;
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Feeds Create failed from user!');
    }
    return null;
  });


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0]; // Allow only the first file
      if (newFile) {
        const fileWithPreview = Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });
        setValue('image', fileWithPreview, { shouldValidate: true }); // Set the single file
      }
    },
    [setValue]
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
                  <RHFSelect name="feed_type" label="Type">
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="Image">Image</MenuItem>
                    <MenuItem value="Video">Video</MenuItem>
                    <MenuItem value="Youtube">YouTube</MenuItem>
                  </RHFSelect>

                  <RHFSelect name="status" label="Status">
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                   
                  </RHFSelect>
                </Box>

                {/* Language, Heading, Description */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={2}>
                    <RHFSelect name="language" label="Language">
                      <MenuItem value="Telugu">Telugu</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                    </RHFSelect>
                    <RHFTextField name="heading" label="Heading" />
                    <RHFTextField name="description" label="Description" />
                  </Stack>
                </Box>

                {/* Conditionally Render Image Field */}
                {(values.feed_type === 'Image' ||
                  values.feed_type === 'Video' ||
                  values.feed_type === 'Youtube') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    {/* Image Field */}
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Image</Typography>
                      <RHFUpload
                        thumbnail
                        name="image"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                      />
                    </Stack>
                  </Box>
                )}

                {(values.feed_type === 'Video' || values.feed_type === 'Youtube') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Video</Typography>
                      <RHFTextField name="video" label="Video URL or ID" />
                    </Stack>
                  </Box>
                )}

                {values.feed_type === 'Video' && (
                  <Box>
                    <RHFTextField
                      name="duration"
                      label="Duration (in seconds)"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
                    />
                  </Box>
                )}

                <Box>
                  <RHFTextField
                    name="posting_date"
                    label="posting_date"
                    type="date"
                    InputProps={{
                      inputProps: {
                        min: '2020-01-01', // Optionally, set a minimum date
                      },
                    }}
                    InputLabelProps={{
                      shrink: true, // Ensures the label stays above the field even when not focused
                    }}
                  />
                </Box>
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
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
