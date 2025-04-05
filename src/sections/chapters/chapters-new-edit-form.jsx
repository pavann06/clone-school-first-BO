import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm ,Controller } from 'react-hook-form';
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
import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';

// API and Services

// Form Components
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { CreateChapter, UpdateChapter } from 'src/api/chapters';
import OnlineCourseDropdown from './online-courses-dropdown';

// ----------------------------------------------------------------------

export default function ChaptersNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    chapter_number: Yup.string().required('Chapter number is required'),
    chapter_name: Yup.string().required('Chapter name is required'),
    number_of_lessons: Yup.number().required('Number of lessons is required').min(1),
    mcq: Yup.boolean().required(),
    mcq_count: Yup.string(),
    total_marks: Yup.number().required('Total marks is required').min(1),
    course_id: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      chapter_number: currentEdutainment?.chapter_number || '',
      chapter_name: currentEdutainment?.chapter_name || '',
      number_of_lessons: currentEdutainment?.number_of_lessons || 0,
      mcq: currentEdutainment?.mcq ?? false,
      mcq_count: currentEdutainment?.mcq_count || 0,
      total_marks: currentEdutainment?.total_marks || 0,
      course_id: currentEdutainment?.course_id || '',
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
       
      };

      if (!currentEdutainment) {
        payload.status = 'Pending';
      }

      const response = currentEdutainment
        ? await UpdateChapter({ ...payload, id: currentEdutainment.id })
        : await CreateChapter(payload);

      console.log('Full API Response:', response); // Debugging

      if (response?.success) {
        enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.chapters.root);
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
                {/* Chapter Info */}
                <Stack spacing={2} gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <RHFTextField name="chapter_number" label="Chapter Number" />
                  <RHFTextField name="chapter_name" label="Chapter Name" />
                  <RHFTextField
                    name="number_of_lessons"
                    label="Number of Lessons"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  <RHFSelect name="mcq" label="Has MCQ?">
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </RHFSelect>
                  {values.mcq && (
                    <RHFTextField
                      name="mcq_count"
                      label="MCQ Count"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  )}
                  <RHFTextField
                    name="total_marks"
                    label="Total Marks"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Stack>

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
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Chapter' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ChaptersNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
