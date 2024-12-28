import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import React, { useMemo, useCallback } from 'react';
// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// Form Components
import { CreatePoll, UpdatePoll } from 'src/api/polls';

import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

export default function PollsNewEditForm({ currentPoll }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Validation schema
  const PollSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    options: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required('Option label is required'),
        })
      )
      .min(2, 'At least two options are required')
      .required('Options are required'),
    answer: Yup.string().required('Answer is required'),
    is_active: Yup.boolean(),
    description: Yup.string().required('Description is required'),
  });

  // const defaultValues = useMemo(
  //   () => ({
  //     question: currentPoll?.question || '',
  //     options: currentPoll?.options || '',
  //     answer: currentPoll?.answer || '',
  //     is_active: currentPoll?.is_active || false,
  //     description: currentPoll?.description || '',
  //   }),
  //   [currentPoll]
  // );
  const defaultValues = useMemo(() => ({
    question: currentPoll?.question || '',
    options: currentPoll?.options
      ? Object.entries(currentPoll.options || {}).map(([key, value]) => ({
          label: value,
        }))
      : [],
    answer: currentPoll?.answer
      ? Object.entries(currentPoll.options || {}).find(
          ([key]) => key === currentPoll.answer
        )?.[1] || ''
      : '',
    is_active: currentPoll?.is_active || false,
    description: currentPoll?.description || '',
  }), [currentPoll]);
  
  
  

  const methods = useForm({
    resolver: yupResolver(PollSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {

      const formattedOptions = {};
      data.options.forEach((option, index) => {
        const labelKey = String.fromCharCode(65 + index); // Converts 0 to 'A', 1 to 'B', etc.
        formattedOptions[labelKey] = option.label; // Use 'label' or other fields as needed
      });

      const selectedAnswerKey = Object.keys(formattedOptions).find(
        (key) => formattedOptions[key] === data.answer
      );
  
      const payload = {
        ...data,
        options: formattedOptions,
        answer: selectedAnswerKey, // Replace array with formatted object
      };


      const response = currentPoll
        ? await UpdatePoll({ ...payload, id: currentPoll.id })
        : await CreatePoll(payload);

      if (response?.success) {
        enqueueSnackbar(currentPoll ? 'Update success!' : 'Create success!');
        router.push(paths.dashboard.polls.root);
        reset();
        return response;
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
            <CardHeader title={!currentPoll ? 'Create Poll' : 'Edit Poll'} />

            <Stack spacing={3} sx={{ p: 3 }}>
              {/* Question */}
              <RHFTextField name="question" label="Question" />

              {/* Options */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Options
                </Typography>
                <Stack spacing={1.5}>
                  {fields.map((field, index) => (
                    <Box key={field.id} display="flex" alignItems="center" gap={2}>
                      <RHFTextField
                        name={`options[${index}].label`}
                        label={`Option ${String.fromCharCode(65 + index)}`}
                        fullWidth
                      />
                      <Typography
                        variant="body2"
                        onClick={() => remove(index)}
                        sx={{ cursor: 'pointer', color: 'error.main' }}
                      >
                        Remove
                      </Typography>
                    </Box>
                  ))}
                  <Typography
                    variant="body2"
                    onClick={() => append({ label: '' })}
                    sx={{ cursor: 'pointer', color: 'primary.main', textAlign: 'left' }}
                  >
                    Add Option
                  </Typography>
                </Stack>
              </Box>

            

              {/* Answer */}
              <RHFSelect name="answer" label="Answer">
                {Array.isArray(values.options) && values.options.length > 0 ? (
                  values.options.map((option, index) => (
                    <MenuItem key={index} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No options available</MenuItem>
                )}
              </RHFSelect>

              {/* Description */}
              <RHFTextField name="description" label="Description" multiline rows={4} />

              {/* Is Active */}
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>Is Active:</Typography>
                <Switch
                  checked={values.is_active}
                  onChange={(e) => setValue('is_active', e.target.checked)}
                />
              </Box>

              {/* Submit Button */}
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentPoll ? 'Create Poll' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

PollsNewEditForm.propTypes = {
  currentPoll: PropTypes.any,
};
