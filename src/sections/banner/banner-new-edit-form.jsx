


import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';

import {
  Box,
  Card,
  Stack,
  Grid,
  Typography,
  MenuItem,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, {
  RHFTextField,
  RHFUpload,
  RHFSelect,
} from 'src/components/hook-form';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import request from 'src/api/request';
import { CreateBannerr , UpdateBannerr } from 'src/api/banner';

export default function BannerNewEditForm({ currentBanner }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Validation schema
  const SchoolSchema = Yup.object().shape({
    image: Yup.string().required('Image is required'),
    screen: Yup.string()
  .oneOf(['Home', 'Courses'], 'Invalid screen')
  .required('Screen is required'),

    status: Yup.string().oneOf(['Active', 'Inactive'], 'Invalid status').required('Status is required'),
  });

  // ✅ Default values
  const defaultValues = useMemo(() => ({
    image: currentBanner?.image || '',
    screen: currentBanner?.screen || '',
    status: currentBanner?.status || 'active',
  }), [currentBanner]);

  const methods = useForm({
    resolver: yupResolver(SchoolSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = currentBanner
        ? await UpdateBannerr({ ...data, id: currentBanner.id })
        : await CreateBannerr(data);

      if (response?.success) {
        enqueueSnackbar(currentBanner ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.banner.root);
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

  // ✅ File Upload
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
      enqueueSnackbar('Image upload failed!', { variant: 'error' });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [enqueueSnackbar]);

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue('image', uploadedUrl);
      }
    }
  }, [setValue, handleUpload]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Stack spacing={3}>

              {/* Screen Field */}
           <RHFSelect name="screen" label="Screen">
  <MenuItem value="Home">Home</MenuItem>
  <MenuItem value="Courses">Courses</MenuItem>
</RHFSelect>


              {/* Status Select */}
              <RHFSelect name="status" label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </RHFSelect>

              {/* Image Upload */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Upload Image
                </Typography>
                <RHFUpload
                  name="image"
                  onDrop={handleDrop}
                  onRemove={() => setValue('image', '')}
                  isLoading={isUploading}
                />
              </Box>

              {/* Preview */}
              {watch('image') && typeof watch('image') === 'string' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Preview</Typography>
                  <Box
                    component="img"
                    src={watch('image')}
                    alt="Preview"
                    sx={{ height: 100, borderRadius: 1 }}
                  />
                </Box>
              )}

              {/* Submit */}
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {currentBanner ? 'Save Changes' : 'Create Entry'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BannerNewEditForm.propTypes = {
  currentBanner: PropTypes.object,
};
