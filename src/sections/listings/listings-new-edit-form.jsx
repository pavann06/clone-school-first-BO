




import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
// Material-UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Grid from '@mui/material/Unstable_Grid2';

// Internal Utilities
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { CreateListing, UpdateListing } from 'src/api/listings';
import BusinessCategoriesDropdown from './business-categories-dropdown';
import BusinessSubcategoriesDropdown from './business-subcategories-dropdown';

export default function ListingsNewEditForm({ currentListing }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const ListingsSchema = Yup.object().shape({
    business_name: Yup.string().required('Business name is required'),
    description: Yup.string().required('Description is required'),
    services: Yup.array()
      .of(Yup.string().required('Service is required'))
      .required('Services are required'),
    category: Yup.string().required('Category is required'), // Validation for categories
    sub_categories: Yup.array().of(Yup.string()).required('Subcategories are required'),
    thumbnail: Yup.mixed().required('Thumbnail is required'),
    images: Yup.array().nullable(),
    address: Yup.string().required('Address is required'),
    longitude: Yup.number().required('Longitude is required'),
    latitude: Yup.number().required('Latitude is required'),
    mobile: Yup.string().required('Mobile is required'),
    whatsapp: Yup.string().required('WhatsApp is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    tags: Yup.array().of(Yup.string()).required('Tags are required'),
    valid_till: Yup.string('Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      business_name: currentListing?.business_name || '',
      description: currentListing?.description || '',
      services: currentListing?.services || [],
      thumbnail: currentListing?.thumbnail || null,
      images: currentListing?.images || [],
      category: currentListing?.category || '',
      sub_categories: currentListing?.sub_categories || [],
      address: currentListing?.address || '',
      longitude: currentListing?.longitude || '',
      latitude: currentListing?.latitude || '',
      mobile: currentListing?.mobile || '',
      whatsapp: currentListing?.whatsapp || '',
      email: currentListing?.email || '',
      tags: currentListing?.tags || [],
      valid_till: currentListing?.valid_till ? dayjs(currentListing.valid_till) : null,
  
    }),
    [currentListing]
  );

  const methods = useForm({
    resolver: yupResolver(ListingsSchema),
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
        services: Array.isArray(data.services) ? data.services.map((item) => item.trim()) : [],
        tags: Array.isArray(data.tags)
          ? data.tags.map((item) => item.trim())
          : data.tags.split(',').map((item) => item.trim()),
        images: data.images || [],
        thumbnail: data.thumbnail || null,
      };

      const response = currentListing
        ? await UpdateListing({ ...payload, id: currentListing.id })
        : await CreateListing(payload);

      if (response?.success) {
        enqueueSnackbar(currentListing ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push('/dashboard/listings');
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
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
      try {
        const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
        const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

        if (uploadedUrls.length > 0) {
          setValue('images', [...values.images, ...uploadedUrls]);
          enqueueSnackbar('Files uploaded successfully', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Error uploading files', { variant: 'error' });
      }
    },
    [handleUpload, setValue, values.images, enqueueSnackbar]
  );

  const handleThumbnailUpload = useCallback(
    async (file) => {
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue('thumbnail', uploadedUrl);
        enqueueSnackbar('Thumbnail uploaded successfully', { variant: 'success' });
      }
    },
    [handleUpload, setValue, enqueueSnackbar]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="business_name" label="Business Name" />
              <RHFTextField name="description" label="Description" multiline rows={4} />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Services</Typography>
                <RHFTextField
                  name="services"
                  label="Services"
                  onChange={(e) => setValue('services', e.target.value.split(','))}
                  value={values.services.join(', ')}
                  multiline
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Categories</Typography>
                <Controller
                  name="category"
                  control={methods.control}
                  render={({ field }) => (
                    <BusinessCategoriesDropdown
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        setValue('sub_categories', []); // Clear subcategories when category changes
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Subcategories</Typography>
                <Controller
                  name="sub_categories"
                  control={methods.control}
                  render={({ field }) => (
                    <BusinessSubcategoriesDropdown
                      categoryId={values.category}
                      categoryName={values.category}
                      value={field.value || []}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Thumbnail</Typography>
                <RHFUpload
                  name="thumbnail"
                  label="Thumbnail"
                  onDrop={(files) => handleThumbnailUpload(files[0])}
                  isLoading={isUploading}
                  currentFiles={values.thumbnail ? [values.thumbnail] : []}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Images</Typography>
                <RHFUpload
                  name="images"
                  label="Images"
                  multiple
                  onDrop={handleDrop}
                  isLoading={isUploading}
                  currentFiles={values.images}
                />
              </Stack>

              <RHFTextField name="address" label="Address" />
              <RHFTextField name="longitude" label="Longitude" type="number" />
              <RHFTextField name="latitude" label="Latitude" type="number" />
              <RHFTextField name="mobile" label="Mobile" />
              <RHFTextField name="whatsapp" label="WhatsApp" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="maps_link" label="Maps link" />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Valid Till</Typography>
                <Controller
                  name="valid_till"
                  control={methods.control}
                  render={({ field }) => (
                    <DatePicker
  {...field}
  label="Valid Till"
  inputFormat="yyyy-MM-dd"
  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
  renderInput={(params) => <RHFTextField {...params} />}
/>

                  )}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Tags</Typography>
                <RHFTextField
                  name="tags"
                  label="Tags"
                  onChange={(e) => setValue('tags', e.target.value.split(','))}
                  value={values.tags.join(', ')}
                  multiline
                />
              </Stack>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                {currentListing ? 'Save Changes' : 'Create Listing'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ListingsNewEditForm.propTypes = {
  currentListing: PropTypes.object,
};
