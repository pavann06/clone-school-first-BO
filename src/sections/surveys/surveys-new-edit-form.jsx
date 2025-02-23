import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import { CreateSurvey, UpdateSurvey } from 'src/api/survey';
import FormProvider, { RHFTextField, RHFSelect, RHFUpload } from 'src/components/hook-form';

import SchoolsDropdown from './schools-dropdown';

export default function SurveysNewEditForm({ currentSurvey }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const SurveySchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    duration: Yup.number().required('Duration is required').min(1),
    survey_type: Yup.string().required('Survey Type is required'),
    target_group: Yup.array().of(Yup.string()).min(1, 'At least one target group is required'),
    status: Yup.string().required('Status is required'),
    closing_date: Yup.date().required('Closing Date is required'),
    total_responses: Yup.number().required('Total Responses is required').min(0),
    number_of_questions: Yup.number().required('Number of Questions is required').min(1),
    school_ids: Yup.array().of(Yup.string()).min(1, 'At least one school is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentSurvey?.title || '',
      description: currentSurvey?.description || '',
      duration: currentSurvey?.duration || 30,
      image: currentSurvey?.image || '',
      survey_type: currentSurvey?.survey_type || 'General',
      target_group: currentSurvey?.target_group || ['All'],
      status: currentSurvey?.status || 'Closed',
      closing_date: currentSurvey?.closing_date || '',
      total_responses: currentSurvey?.total_responses || 0,
      number_of_questions: currentSurvey?.number_of_questions || 10,
      school_ids: currentSurvey?.school_ids || [],
    }),
    [currentSurvey]
  );

  const methods = useForm({
    resolver: yupResolver(SurveySchema),
    defaultValues,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = currentSurvey
        ? await UpdateSurvey({ ...data, id: currentSurvey.id })
        : await CreateSurvey(data);

      if (response?.success) {
        enqueueSnackbar(currentSurvey ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push('/dashboard/surveys');
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
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
        setValue('image', fileWithPreview);

        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('image', uploadedUrl);
          enqueueSnackbar('Image uploaded successfully');
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
            {!mdUp && <CardHeader title="Survey Details" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="description" label="Description" multiline rows={4} />
              <RHFTextField name="duration" label="Duration (minutes)" type="number" />
              <RHFSelect name="survey_type" label="Survey Type">
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Customer Feedback">Customer Feedback</MenuItem>
              </RHFSelect>
              <RHFSelect name="status" label="Status">
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </RHFSelect>
              <RHFTextField name="closing_date" label="Closing Date" type="datetime-local" />
              <RHFTextField name="total_responses" label="Total Responses" type="number" />
              <SchoolsDropdown
  value={methods.watch('school_ids')}
  onChange={(selectedSchools) => setValue('school_ids', selectedSchools)}
/>

              <RHFTextField name="number_of_questions" label="Number of Questions" type="number" />
              <Box>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Image</Typography>
                  <RHFUpload
                    thumbnail
                    name="image"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    isLoading={isUploading}
                  />
                </Stack>
              </Box>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentSurvey ? 'Create Survey' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SurveysNewEditForm.propTypes = {
  currentSurvey: PropTypes.any,
};
