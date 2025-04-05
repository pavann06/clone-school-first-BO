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
import { CreateMcq, UpdateMcq } from 'src/api/mcq';

// API and Services

// Form Components
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';

import OnlineCourseDropdown from './online-courses-dropdown';
import LessonDropdown from './lessons-dropdown';

// ----------------------------------------------------------------------

export default function McqNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    question_number: Yup.number().required('Question number is required'),
    question_marks: Yup.number().required('Marks are required'),
    mcq_description: Yup.string(),
    options: Yup.array()
      .of(Yup.string().required('Option cannot be empty'))
      .min(2, 'Minimum 2 options'),
    correct_answer: Yup.string().required('Please select the correct answer'),
    course_id: Yup.string(),
    lesson_id: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      question: currentEdutainment?.question || '',
      question_number: currentEdutainment?.question_number || '',
      question_marks: currentEdutainment?.question_marks || '',
      mcq_description: currentEdutainment?.mcq_description || '',
      options: currentEdutainment?.options || ['', '', ''], // at least 3 empty by default
      correct_answer: currentEdutainment?.correct_answer || '',
      course_id: currentEdutainment?.course_id || '',
      lesson_id: currentEdutainment?.lesson_id || '',
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
        ? await UpdateMcq({ ...payload, id: currentEdutainment.id })
        : await CreateMcq(payload);

      console.log('Full API Response:', response); // Debugging

      if (response?.success) {
        enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.mcqs.root);
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

  

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="question" label="Question" />
              <RHFTextField name="question_number" label="Question Number" type="number" />
              <RHFTextField name="question_marks" label="Question Marks" type="number" />
              <RHFTextField
                name="mcq_description"
                label="Description (optional)"
                multiline
                rows={2}
              />

              {/* Dynamic Options */}
              {values.options?.map((opt, index) => (
                <RHFTextField
                  key={index}
                  name={`options[${index}]`}
                  label={`Option ${index + 1}`}
                />
              ))}

              {/* Add/Remove Option Buttons */}
              <Box display="flex" gap={2}>
                <LoadingButton
                  variant="outlined"
                  size="small"
                  onClick={() => setValue('options', [...values.options, ''])}
                >
                  Add Option
                </LoadingButton>
                {values.options.length > 2 && (
                  <LoadingButton
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() =>
                      setValue('options', values.options.slice(0, values.options.length - 1))
                    }
                  >
                    Remove Last Option
                  </LoadingButton>
                )}
              </Box>

              {/* Correct Answer */}
              <RHFSelect name="correct_answer" label="Correct Answer">
                {values.options?.map((opt, index) => (
                  <MenuItem key={index} value={opt}>
                    {opt || `Option ${index + 1}`}
                  </MenuItem>
                ))}
              </RHFSelect>

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
                  Select Lesson
                </Typography>
                <Controller
                  name="lesson_id"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <LessonDropdown value={field.value} onChange={field.onChange} />
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
                {!currentEdutainment ? 'Create Edutainment' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

McqNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
