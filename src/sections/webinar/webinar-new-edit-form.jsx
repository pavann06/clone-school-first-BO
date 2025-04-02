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

import { Typography ,MenuItem} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Grid from '@mui/material/Unstable_Grid2';

// Internal Utilities
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFTextField , RHFSelect } from 'src/components/hook-form';

import { CreateWebinar , UpdateWebinar } from 'src/api/webinar';
import { Description } from '@mui/icons-material';

export default function WebinarNewEditForm({ currentListing }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const ListingsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    webinar_link: Yup.string().required('webinar link is required'),
    audience: Yup.string().required('Audience is required'),
    total_slots: Yup.number().required('Total slots are required').positive().integer(),
    entry_fee: Yup.number().required('Entry fee is required').min(0),
    language: Yup.string().required('Language is required'),
    duration: Yup.number().required('Duration is required'),
    total_enrolled: Yup.number().required('Total enrolled is required').min(0),
    date: Yup.date().required('Date is required'),
    thumbnail_image: Yup.mixed().required('Thumbnail is required'),
    logo: Yup.mixed().required('Logo is required'),
    images: Yup.array().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      thumbnail_image: currentListing?.thumbnail_image || null,
      logo: currentListing?.logo || null,
      images: currentListing?.images || [],
      name: currentListing?.name || '',
      description: currentListing?.description || '',
      webinar_link: currentListing?.webinar_link || '',
      audience: currentListing?.audience || '',
      duration: currentListing?.duration || '',
      total_slots: currentListing?.total_slots || '',
      entry_fee: currentListing?.entry_fee || '',
      language: currentListing?.language || '',
      total_enrolled: currentListing?.total_enrolled || '',
      date: currentListing?.date || '',
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

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       date: dayjs(data.date).format('YYYY-MM-DD'), // Safely format
  //       images: data.images || [],
  //       thumbnail_image: data.thumbnail_image || null,
  //       logo: data.logo || null,
  //     };

  //     const response = currentListing
  //       ? await UpdateWebinar({ ...payload, id: currentListing.id })
  //       : await CreateWebinar(payload);

  //     if (response?.success) {
  //       enqueueSnackbar(currentListing ? 'Update success!' : 'Create success!', {
  //         variant: 'success',
  //       });
  //       router.push('/dashboard/webinar');
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
      const payload = {
        ...data,
        date: dayjs(data.date).format('YYYY-MM-DD'), // Safely format
        images: data.images || [],
        thumbnail_image: data.thumbnail_image || null,
        logo: data.logo || null,
      };
  
      const response = currentListing
        ? await UpdateWebinar({ ...payload, id: currentListing.id })
        : await CreateWebinar(payload);
  
      console.log("Full API Response:", response); // Debugging
  
      if (response?.success) {
        enqueueSnackbar(currentListing ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push('/dashboard/webinar');
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
        setValue('thumbnail_image', uploadedUrl);
        enqueueSnackbar('Thumbnail uploaded successfully', { variant: 'success' });
      }
    },
    [handleUpload, setValue, enqueueSnackbar]
  );

  const handleLogoUpload = useCallback(
    async (file) => {
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue('logo', uploadedUrl);
        enqueueSnackbar('Logo uploaded successfully', { variant: 'success' });
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
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="description" label="Description"   multiline rows={4} />

              <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <RHFTextField name="webinar_link" label="Webinar Link" />
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFTextField name="audience" label="Audience" />
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFTextField name="duration" label="Duration" type="number" />
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFTextField name="total_slots" label="Total Slots" type="number" />
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFTextField name="entry_fee" label="Entry Fee" type="number" />
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFSelect name="language" label="Language">
                  <MenuItem value="Telugu">Telugu</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </RHFSelect>
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFTextField name="total_enrolled" label="Total Enrolled" type="number" />
              </Grid>
              <Grid xs={12} sm={6}>
                <RHFTextField name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Thumbnail</Typography>
                <RHFUpload
                  name="thumbnail_image"
                  label="Thumbnail"
                  onDrop={(files) => handleThumbnailUpload(files[0])}
                  isLoading={isUploading}
                  currentFiles={values.thumbnail_image ? [values.thumbnail_image] : []}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Logo</Typography>
                <RHFUpload
                  name="logo"
                  label="Logo"
                  onDrop={(files) => handleLogoUpload(files[0])}
                  isLoading={isUploading}
                  currentFiles={values.logo ? [values.logo] : []}
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

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                {currentListing ? 'Save Changes' : 'Create Webinar'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

WebinarNewEditForm.propTypes = {
  currentListing: PropTypes.object,
};
