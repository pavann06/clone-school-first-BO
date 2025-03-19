import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react'; // Combined import

import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem, Checkbox, ListItemText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';

import { CreateSurvey, UpdateSurvey } from 'src/api/survey';
import SchoolsDropdown from '../surveys/schools-dropdown';


// Form Components
import FormProvider, {
  RHFUpload,
  RHFSelect,
  RHFTextField,
  RHFMultiSelect,
} from 'src/components/hook-form';

export default function SurveyNewEditForm({ currentSurvey }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const SurveySchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    duration: Yup.number().required('Duration is required'),
    image: Yup.mixed(),
    survey_type: Yup.string().required('Survey type is required'),
    target_group: Yup.array().min(1, 'At least one target group is required'),
    status: Yup.string().required('Status is required'),
    closing_date: Yup.date().required('Closing date is required'),
    total_responses: Yup.number(),
    number_of_questions: Yup.number(),
    school_ids: Yup.array().of(Yup.string()).min(1, 'At least one school is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentSurvey?.title || '',
      description: currentSurvey?.description || '',
      duration: currentSurvey?.duration || 0,
      image: currentSurvey?.image || '',
      survey_type: currentSurvey?.survey_type || 'General',
      target_group: currentSurvey?.target_group || ['All'], // Ensure default value is always an array
      status: currentSurvey?.status || 'Closed',
      closing_date: currentSurvey?.closing_date || '',
      total_responses: currentSurvey?.total_responses || 0,
      number_of_questions: currentSurvey?.number_of_questions || 0,
      school_ids: currentSurvey?.school_ids || [],
    }),
    [currentSurvey]
  );

  const methods = useForm({
    resolver: yupResolver(SurveySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch(); // Correct usage here

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        image: data.image || null,
      };
      if (!currentSurvey) {
        payload.status = 'Closed';
      }

      const response = currentSurvey
        ? await UpdateSurvey({ ...payload, id: currentSurvey.id })
        : await CreateSurvey(payload);

      if (response?.success) {
        enqueueSnackbar(currentSurvey ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });

        // Navigate to the "add questions" form with the survey ID
        const surveyId = response.data?.id || currentSurvey.id;
        if (surveyId) {
          router.push(paths.dashboard.survey(surveyId).questions_new);
        }

        reset();
        return response;
      }

      const errorMessage = response?.error || 'Operation failed';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return response;
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
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
            {!mdUp && <CardHeader title="Survey Information" />}

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
                {/* Title Field */}
                <RHFTextField name="title" label="Title" />

                {/* Description Field */}

                {/* Duration Field */}
                <RHFTextField
                  name="duration"
                  label="Duration (in minutes)"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />

                {/* Survey Type Dropdown */}
                <RHFSelect name="survey_type" label="Survey Type">
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Assessment">Assessment</MenuItem>
                </RHFSelect>

                {/* Status Dropdown */}
                <RHFSelect name="status" label="Status">
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="Deleted">Deleted</MenuItem>
                </RHFSelect>


                {/* Closing Date Picker */}
                <RHFTextField
                  name="closing_date"
                  label="Closing Date"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                />

                {/* Total Responses Field */}
                <RHFTextField name="total_responses" label="Total Responses" type="number" />

                <RHFTextField name="description" label="Description" multiline rows={4} />
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Target Group</Typography>
                    <RHFMultiSelect
                      name="target_group"
                      label="Target Group"
                      options={[
                        { label: 'All', value: 'All' },
                        { label: 'Youth', value: 'Youth' },
                        { label: 'Parents', value: 'Parents' },
                        { label: 'Single Parents', value: 'Single Parents' },
                        { label: 'Grand Parents', value: 'Grand Parents' },
                      ]}
                      multiple
                    />
                  </Stack>
                </Box>

                {/* Image Field */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
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

                {/* Number of Questions Field */}
                <RHFTextField
                  name="number_of_questions"
                  label="Number of Questions"
                  type="number"
                />
              </Box>
                            <SchoolsDropdown
                value={methods.watch('school_ids')}
                onChange={(selectedSchools) => setValue('school_ids', selectedSchools)}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentSurvey ? 'Create Survey' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SurveyNewEditForm.propTypes = {
  currentSurvey: PropTypes.any,
};
