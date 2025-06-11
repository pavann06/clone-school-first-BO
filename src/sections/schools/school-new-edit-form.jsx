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
    name: Yup.string().required('Name is required'),
    phone_number: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    district: Yup.string().required('District is required'),
    state: Yup.string().required('State is required'),
    poc_name: Yup.string().required('POC Name is required'),
    status: Yup.string().required('Status is required'),
    expiry_date: Yup.date().required('Expiry Date is required'),
    small_logo: Yup.mixed(),
    full_logo: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentSchool?.name || '',
      phone_number: currentSchool?.phone_number || '',
      address: currentSchool?.address || '',
      district: currentSchool?.district || '',
      state: currentSchool?.state || '',
      poc_name: currentSchool?.poc_name || '',
      status: currentSchool?.status || '',
      expiry_date: currentSchool?.expiry_date || '',
      small_logo: currentSchool?.small_logo || '',
      full_logo: currentSchool?.full_logo || '',
    }),
    [currentSchool]
  );

  const methods = useForm({ resolver: yupResolver(SchoolSchema), defaultValues });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const response = currentSchool
      //   ? await UpdateSchool({ ...data, id: currentSchool.id })
      //   : await CreateSchool(data);
      const formattedData = {
  ...data,
  expiry_date: data.expiry_date ? new Date(data.expiry_date).toISOString().split('T')[0] : null,
};

const response = currentSchool
  ? await UpdateSchool({ ...formattedData, id: currentSchool.id })
  : await CreateSchool(formattedData);


      console.log('Full API Response:', response); // Debugging

      if (response?.success) {
        enqueueSnackbar(currentSchool ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
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

  const handleUpload = useCallback(
    async (file) => {
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
    },
    [enqueueSnackbar]
  );

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue('profile_image', file);
        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) setValue('profile_image', uploadedUrl);
      }
    },
    [setValue, handleUpload]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader title="School Details" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="phone_number" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="district" label="District" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="poc_name" label="POC Name" />
              <RHFTextField name="status" label="Status" />
              <RHFTextField
                name="expiry_date"
                label="Expiry Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              <RHFUpload
                name="small_logo"
                label="Upload Small Logo"
                onDrop={async (files) => {
                  const file = files[0];
                  if (file) {
                    setValue('small_logo', file);
                    const uploadedUrl = await handleUpload(file);
                    if (uploadedUrl) setValue('small_logo', uploadedUrl);
                  }
                }}
                isLoading={isUploading}
              />

              <RHFUpload
                name="full_logo"
                label="Upload Full Logo"
                onDrop={async (files) => {
                  const file = files[0];
                  if (file) {
                    setValue('full_logo', file);
                    const uploadedUrl = await handleUpload(file);
                    if (uploadedUrl) setValue('full_logo', uploadedUrl);
                  }
                }}
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
