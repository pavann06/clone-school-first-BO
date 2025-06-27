


import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import {
  Box,
  Card,
  Stack,
  Typography,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import request from 'src/api/request';

import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

import { CreateEvent, UpdateEvent } from 'src/api/events';
import SchoolsDropdown from './schools-dropdown';
import GradesDropdown from './gradederopdown';

export default function EventsNewEditForm({ currentNews }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const EventSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    colour_code: Yup.string().required('Color code is required'),
    description: Yup.string().required('Description is required'),
    school_id: Yup.string().required('School is required'),
    grade_ids: Yup.array().of(Yup.string()).min(1, 'At least one grade is required'),
  });

  const defaultValues = useMemo(() => ({
    name: currentNews?.name || '',
    date: currentNews?.date || '',
    time: currentNews?.time || '',
    colour_code: currentNews?.colour_code || '',
    description: currentNews?.description || '',
    school_id: currentNews?.school_id || '',
    grade_ids: currentNews?.grade_ids || [],
  }), [currentNews]);

  const methods = useForm({
    resolver: yupResolver(EventSchema),
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

      const response = currentNews
        ? await UpdateEvent({ ...payload, id: currentNews.id })
        : await CreateEvent(payload);

      if (response?.success) {
        enqueueSnackbar(currentNews ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push('/dashboard/events');
        reset();
      } else {
        const errors = response?.response?.data?.data;
        if (errors) {
          Object.entries(errors).forEach(([field, messages]) => {
            methods.setError(field, {
              type: 'server',
              message: messages[0],
            });
          });
          enqueueSnackbar('Please correct the errors in the form', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(response?.error || 'Operation failed', {
            variant: 'error',
          });
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', {
        variant: 'error',
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="name" label="Event Name" />
              <RHFTextField name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} />
              <RHFTextField name="time" label="Time" type="time" InputLabelProps={{ shrink: true }} />
              <RHFTextField name="colour_code" label="Color Code (e.g. #FF0000)" />

              <Box>
                <Typography variant="subtitle2">Select School</Typography>
                <SchoolsDropdown
                  value={values.school_id}
                  onChange={(selected) => setValue('school_id', selected)}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2">Select Grades</Typography>
                <GradesDropdown
                  value={values.grade_ids}
                  onChange={(selected) => setValue('grade_ids', selected)}
                />
              </Box>

              <RHFTextField name="description" label="Description" multiline rows={4} />

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {currentNews ? 'Save Changes' : 'Create Event'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

EventsNewEditForm.propTypes = {
  currentNews: PropTypes.object,
};
