

import React, { useMemo, useState, useCallback } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { CreateBusinessCategory, UpdateBusinessCategory } from 'src/api/business-categories';
import BusinessCategoriesDropdown from './business-categories-dropdown';

export default function BusinessCategoriesNewEditForm({ currentBusinessCategory }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const CategorySchema = Yup.object().shape({
    category_name: Yup.string().required('Category name is required'),
    category_description: Yup.string().required('Category description is required'),
    parent_id: Yup.string(),
    category_image: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      category_name: currentBusinessCategory?.category_name || '',
      category_description: currentBusinessCategory?.category_description || '',
      parent_id: currentBusinessCategory?.parent_id || '',
      category_image: currentBusinessCategory?.category_image || '',
    }),
    [currentBusinessCategory]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        category_image: data.category_image || null,
        parent_id: data.parent_id.length > 0 ? data.parent_id : null,
      };

      const response = currentBusinessCategory
        ? await UpdateBusinessCategory({ ...payload, id: currentBusinessCategory.id })
        : await CreateBusinessCategory(payload);

      if (response?.success) {
        enqueueSnackbar(currentBusinessCategory ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.business_categories.root);
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

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const payload = {
          files: file,
        };
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
        setValue('category_image', fileWithPreview);
        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('category_image', uploadedUrl);
          enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
        }
      }
    },
    [setValue, enqueueSnackbar, handleUpload]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('category_image', null);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
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
                <RHFTextField name="category_name" label="Category Name" />
              </Box>

              <Box>
                <RHFTextField
                  name="category_description"
                  label="Category Description"
                  multiline
                  rows={4}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2">Parent Categories</Typography>
                <Controller
                  name="parent_id"
                  control={control}
                  render={({ field }) => (
                    <BusinessCategoriesDropdown
                      value={field.value || ''} // Ensure value is a string or number, not undefined/null
                      onChange={field.onChange} // Directly pass field.onChange
                    />
                  )}
                />
              </Box>

              <Box>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Category Image</Typography>
                  <RHFUpload
                    thumbnail
                    name="category_image"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    isLoading={isUploading}
                  />
                </Stack>
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentBusinessCategory ? 'Create Category' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BusinessCategoriesNewEditForm.propTypes = {
  currentBusinessCategory: PropTypes.any,
};
