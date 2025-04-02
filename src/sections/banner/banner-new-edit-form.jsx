

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';

import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem, Switch, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';
import { CreateBannerr, UpdateBannerr } from 'src/api/banner';

// Form Components
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function BannerNewEditForm({ currentBanner }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  // Updated Validation Schema
  const BannerSchema = Yup.object().shape({
    banner_image: Yup.mixed(),
    module: Yup.string().required('Module is required'),
    is_active: Yup.boolean().required('Status is required'),
    action_type: Yup.string().required('Action type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      banner_image: currentBanner?.banner_image || '',
      module: currentBanner?.module || '',
      is_active: currentBanner?.is_active || true, // Default to 'true'
      action_type: currentBanner?.action_type || 'None',
    }),
    [currentBanner]
  );

  const methods = useForm({
    resolver: yupResolver(BannerSchema),
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
        banner_image: data.banner_image || null,
      };

      const response = currentBanner
        ? await UpdateBannerr({ ...payload, id: currentBanner.id })
        : await CreateBannerr(payload);

      if (response?.success) {
        enqueueSnackbar(currentBanner ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.banner.root);
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
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return null;
    }
  });

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const payload = { files: file };
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
        setValue('banner_image', fileWithPreview);
        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('banner_image', uploadedUrl);
          enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
        }
      }
    },
    [setValue, enqueueSnackbar, handleUpload]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('banner_image', null); // Remove the image
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('banner_image', null); // Reset to no image
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}

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
                {/* Module Dropdown */}
                <Box
                  columnGap={2}
                  rowGap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="module" label="Module" />

                  <RHFTextField name="action_type" label="Action Type" />
                </Box>

                {/* Is Active Toggle */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={2}>
                    <Typography variant="subtitle2">Is Active</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.is_active}
                          onChange={(e) => setValue('is_active', e.target.checked)}
                          name="is_active"
                          color="primary"
                        />
                      }
                      label={values.is_active ? 'Active' : 'Inactive'}
                    />
                  </Stack>
                </Box>

                {/* Banner Image Upload */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Banner Image</Typography>
                    <RHFUpload
                      thumbnail
                      name="banner_image"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      isLoading={isUploading}
                    />
                  </Stack>
                </Box>
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentBanner ? 'Create Banner' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BannerNewEditForm.propTypes = {
  currentBanner: PropTypes.any,
};
