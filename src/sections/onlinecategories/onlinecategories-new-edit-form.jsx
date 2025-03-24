

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import request from 'src/api/request';

import { CreateStoreCategory, UpdateStoreCategory } from 'src/api/edutainment';

// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

export default function OnlineCategoriesNewEditForm({ currentCategory }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const CategorySchema = Yup.object().shape({
    category_name: Yup.string().required('Category Name is required'),
    thumbnail_image: Yup.mixed(),
    icon: Yup.mixed(),
    is_active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      category_name: currentCategory?.category_name || '',
      thumbnail_image: currentCategory?.thumbnail_image || '',
      icon: currentCategory?.icon || '',
      is_active: currentCategory?.is_active ?? true,
    }),
    [currentCategory]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const { reset, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };
      const response = currentCategory
        ? await UpdateStoreCategory({ ...payload, id: currentCategory.id })
        : await CreateStoreCategory(payload);

      if (response?.success) {
        enqueueSnackbar(currentCategory ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.onlinecategories.root);
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const response = await request.UploadFiles({ files: file });
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
  }, [enqueueSnackbar]);

  const handleDrop = useCallback(async (acceptedFiles, field) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue(field, file);
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue(field, uploadedUrl);
        enqueueSnackbar(`${field.replace('_', ' ')} uploaded successfully`, { variant: 'success' });
      }
    }
  }, [setValue, enqueueSnackbar, handleUpload]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {/* <CardHeader title={currentCategory ? 'Edit Category' : 'Create Category'} /> */}
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="category_name" label="Category Name" />

              <Box>
                <Typography variant="subtitle2">Thumbnail Image</Typography>
                <RHFUpload
                  name="thumbnail_image"
                  maxSize={10485760}
                  onDrop={(files) => handleDrop(files, 'thumbnail_image')}
                  isLoading={isUploading}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2">Icon</Typography>
                <RHFUpload
                  name="icon"
                  maxSize={10485760}
                  onDrop={(files) => handleDrop(files, 'icon')}
                  isLoading={isUploading}
                />
              </Box>

              <FormControlLabel
                control={<Switch {...methods.register('is_active')} defaultChecked />}
                label="Active"
              />

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                {currentCategory ? 'Save Changes' : 'Create Category'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

OnlineCategoriesNewEditForm.propTypes = {
  currentCategory: PropTypes.any,
};
