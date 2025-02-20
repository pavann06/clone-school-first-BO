import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { CreateStudent, UpdateStudent } from 'src/api/students';

export default function StudentsNewEditForm({ currentStudent }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const StudentSchema = Yup.object().shape({
    student_first_name: Yup.string().required('First name is required'),
    student_last_name: Yup.string().required('Last name is required'),
    school_name: Yup.string().required('School name is required'),
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
  });

  const defaultValues = useMemo(
    () => ({
      student_first_name: currentStudent?.student_first_name || '',
      student_last_name: currentStudent?.student_last_name || '',
      school_name: currentStudent?.school_name || '',
      mobile: currentStudent?.mobile || '',
    }),
    [currentStudent]
  );

  const methods = useForm({ resolver: yupResolver(StudentSchema), defaultValues });
  const { reset, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = currentStudent
        ? await UpdateStudent({ ...data, id: currentStudent.id })
        : await CreateStudent(data);

      if (response?.success) {
        enqueueSnackbar(currentStudent ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.students.root);
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader title="Student Details" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="student_first_name" label="First Name" />
              <RHFTextField name="student_last_name" label="Last Name" />
              <RHFTextField name="school_name" label="School Name" />
              <RHFTextField name="mobile" label="Mobile Number" />
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {currentStudent ? 'Save Changes' : 'Create Student'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

StudentsNewEditForm.propTypes = {
  currentStudent: PropTypes.object,
};