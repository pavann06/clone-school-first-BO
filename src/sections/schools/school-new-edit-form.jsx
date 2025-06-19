


import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
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

  const defaultValues = useMemo(() => ({
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
  }), [currentSchool]);

  const methods = useForm({ resolver: yupResolver(SchoolSchema), defaultValues });
  const {
    reset, setValue, watch, handleSubmit, formState: { isSubmitting }
  } = methods;

  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'background.paper',
      '& fieldset': {
        borderColor: 'grey.300',
      },
      '&:hover fieldset': {
        borderColor: 'grey.400',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formattedData = {
        ...data,
        expiry_date: data.expiry_date
          ? new Date(data.expiry_date).toISOString().split('T')[0]
          : null,
      };

      const response = currentSchool
        ? await UpdateSchool({ ...formattedData, id: currentSchool.id })
        : await CreateSchool(formattedData);

      if (response?.success) {
        enqueueSnackbar(currentSchool ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.schools.root);
        reset();
        return response;
      }

      const errors = response?.response?.data?.data;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          methods.setError(field, { type: 'server', message: messages[0] });
        });
        enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
        return null;
      }

      enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      return response;
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return null;
    }
  });

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const response = await request.UploadFiles({ files: file });
      if (response.success) {
        enqueueSnackbar('Image uploaded successfully!', { variant: 'success' });
        return response.data[0].file_url;
      }
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
        <Grid xs={12} md={9}>
          <Card>
            <Stack spacing={3} sx={{ p: 4 }}>
              <RHFTextField name="name" label="Name" sx={fieldStyles} />
              <RHFTextField name="phone_number" label="Phone Number" sx={fieldStyles} />
              <RHFTextField name="address" label="Address" sx={fieldStyles} />
              <RHFTextField name="district" label="District" sx={fieldStyles} />
              <RHFTextField name="state" label="State" sx={fieldStyles} />
              <RHFTextField name="poc_name" label="POC Name" sx={fieldStyles} />
              <RHFTextField name="status" label="Status" sx={fieldStyles} />
              <RHFTextField
                name="expiry_date"
                label="Expiry Date"
                type="date"
                sx={fieldStyles}
                InputLabelProps={{ shrink: true }}
              />

              {/* Small Logo Upload */}
              <Box sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 2, p: 2, backgroundColor: 'background.paper' }}>
                <RHFUpload
                  name="small_logo"
                  label="Upload Small Logo"
                  onDrop={async (files) => {
                    const file = files[0];
                    if (file) {
                      setValue('small_logo', file);
                      const uploadedUrl = await handleUpload(file);
                      if (uploadedUrl) {
                        setValue('small_logo', uploadedUrl);
                        enqueueSnackbar('Small logo uploaded successfully!', { variant: 'success' });
                      } else {
                        enqueueSnackbar('Small logo upload failed!', { variant: 'error' });
                      }
                    }
                  }}
                  isLoading={isUploading}
                />
              </Box>

              {watch('small_logo') && typeof watch('small_logo') === 'string' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Small Logo Preview
                  </Typography>
                  <Box
                    component="img"
                    src={watch('small_logo')}
                    alt="Small Logo"
                    sx={{ height: 100, width: 'auto', borderRadius: 1 }}
                  />
                </Box>
              )}

              {/* Full Logo Upload */}
              <Box sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 2, p: 2, backgroundColor: 'background.paper' }}>
                <RHFUpload
                  name="full_logo"
                  label="Upload Full Logo"
                  onDrop={async (files) => {
                    const file = files[0];
                    if (file) {
                      setValue('full_logo', file);
                      const uploadedUrl = await handleUpload(file);
                      if (uploadedUrl) {
                        setValue('full_logo', uploadedUrl);
                        enqueueSnackbar('Full logo uploaded successfully!', { variant: 'success' });
                      } else {
                        enqueueSnackbar('Full logo upload failed!', { variant: 'error' });
                      }
                    }
                  }}
                  isLoading={isUploading}
                />
              </Box>

              {watch('full_logo') && typeof watch('full_logo') === 'string' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Full Logo Preview
                  </Typography>
                  <Box
                    component="img"
                    src={watch('full_logo')}
                    alt="Full Logo"
                    sx={{ height: 100, width: 'auto', borderRadius: 1 }}
                  />
                </Box>
              )}

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

