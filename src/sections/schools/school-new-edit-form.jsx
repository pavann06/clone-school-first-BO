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
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import request from 'src/api/request';
import { CreateSchool, UpdateSchool } from 'src/api/school';

export default function SchoolNewEditForm({ currentSchool }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const SchoolSchema = Yup.object().shape({
    school_name: Yup.string().required('School Name is required'),
    school_address: Yup.object().shape({
      mandal: Yup.string().required('Mandal is required'),
      district: Yup.string().required('District is required'),
      state: Yup.string().required('State is required'),
    }),
    profile_image: Yup.mixed(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact_number: Yup.string().required('Contact number is required'),
    website: Yup.string().url('Invalid website URL'),
  });

  const defaultValues = useMemo(() => ({
    school_name: currentSchool?.school_name || '',
    school_address: {
      mandal: currentSchool?.school_address?.mandal || '',
      district: currentSchool?.school_address?.district || '',
      state: currentSchool?.school_address?.state || '',
    },
    profile_image: currentSchool?.profile_image || '',
    email: currentSchool?.email || '',
    contact_number: currentSchool?.contact_number || '',
    website: currentSchool?.website || '',
  }), [currentSchool]);

  const methods = useForm({ resolver: yupResolver(SchoolSchema), defaultValues });
  const { reset, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const response = currentSchool
  //       ? await UpdateSchool({ ...data, id: currentSchool.id })
  //       : await CreateSchool(data);

  //     if (response?.success) {
  //       enqueueSnackbar(currentSchool ? 'Update success!' : 'Create success!', { variant: 'success' });
  //       router.push(paths.dashboard.schools.root);
  //       reset();
  //     } else {
  //       enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = currentSchool
        ? await UpdateSchool({ ...data, id: currentSchool.id })
        : await CreateSchool(data);
  
      console.log("Full API Response:", response); // Debugging
  
      if (response?.success) {
        enqueueSnackbar(currentSchool ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.schools.root);
        reset();
        return response;
      }
  
      // Handle field-specific errors
      const errors = response?.response?.data?.data;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          if (methods.setError) {
            methods.setError(field, {
              type: 'server',
              message: messages[0], // First error message
            });
          }
        });
        enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
        return null;
      }
  
      enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      return response;
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return null;
    }
  });
  

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const response = await request.UploadFiles({ files: file });
      if (response.success) return response.data[0].file_url;
      throw new Error('Upload failed');
    } catch {
      enqueueSnackbar('File upload failed', { variant: 'error' });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [enqueueSnackbar]);

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('profile_image', file);
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) setValue('profile_image', uploadedUrl);
    }
  }, [setValue, handleUpload]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader title="School Details" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="school_name" label="School Name" />
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Address</Typography>
                <RHFTextField name="school_address.mandal" label="Mandal" />
                <RHFTextField name="school_address.district" label="District" />
                <RHFTextField name="school_address.state" label="State" />
              </Stack>
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="contact_number" label="Contact Number" />
              <RHFTextField name="website" label="Website" />
              <RHFUpload
                name="profile_image"
                label="Upload Profile Image"
                onDrop={handleDrop}
                isLoading={isUploading}
              />
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {currentSchool ? 'Save Changes' : 'Create School'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SchoolNewEditForm.propTypes = {
  currentSchool: PropTypes.object,
};