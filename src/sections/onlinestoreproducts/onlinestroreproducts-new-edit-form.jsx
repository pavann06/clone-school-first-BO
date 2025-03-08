



import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';

import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { CreateStoreProduct, UpdateStoreProduct } from 'src/api/storeproducts';
import OnlineCategoriesDropdown from './onlinecategories-dropdown';

export default function OnlineStoreProductsNewEditForm({ currentItem }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const ItemSchema = Yup.object().shape({
    item_name: Yup.string().required('Item Name is required'),
    item_description: Yup.string().required('Description is required'),
    thumbnail_image: Yup.string().required('Thumbnail Image is required'),
    list_of_images: Yup.array().required('At least one image is required'),
    mrp: Yup.number().required('MRP is required').positive(),
    final_price: Yup.number().required('Final Price is required').positive(),
    item_category: Yup.string().required('Category is reqiured'),
    gst_amount: Yup.string().required(" gst Amount is required"),
    gst_percentage: Yup.string().required("gst percentage is required"),
    priority: Yup.string().required("priority is required"),
    thumbnail_tag_1: Yup.string().required("Amount is required"),
    thumbnail_tag_2: Yup.string().required("Amount is required"),
    discount_tag: Yup.string().required("Amount is required"),
    

  });

  const defaultValues = useMemo(
    () => ({
      item_name: currentItem?.item_name || '',
      item_description: currentItem?.item_description || '',
      thumbnail_image: currentItem?.thumbnail_image || '',
      list_of_images: currentItem?.list_of_images || [],
      mrp: currentItem?.mrp || '',
      final_price: currentItem?.final_price || '',
      item_category: currentItem?.item_category || '',
      gst_percentage: currentItem?.gst_percentage || '',
      gst_amount: currentItem?.gst_amount || '',
      thumbnail_tag_1 : currentItem?.thumbnail_tag_1 || '',
      thumbnail_tag_2 : currentItem?.thumbnail_tag_2 || '',
      discount_tag: currentItem?.discount_tag || '',
      priority: currentItem?.priority || '',
    }),
    [currentItem]
  );

  const methods = useForm({
    resolver: yupResolver(ItemSchema),
    defaultValues,
  });

  const { reset, watch, setValue, control, handleSubmit, formState: { isSubmitting } } = methods;
  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };
      const response = currentItem ? await UpdateStoreProduct({ ...payload, id: currentItem.id }) : await CreateStoreProduct(payload);
      
      if (response?.success) {
        enqueueSnackbar(currentItem ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push('/dashboard/items');
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const response = await request.UploadFiles({ files: file });
      if (response.success) return response.data[0].file_url;
      throw new Error('Upload failed');
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [enqueueSnackbar]);

  const handleImageDrop = useCallback(async (acceptedFiles) => {
    try {
      const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);
      if (uploadedUrls.length > 0) {
        setValue('list_of_images', [...values.list_of_images, ...uploadedUrls]);
        enqueueSnackbar('Images uploaded successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Error uploading images', { variant: 'error' });
    }
  }, [handleUpload, setValue, values.list_of_images, enqueueSnackbar]);

  const handleThumbnailUpload = useCallback(async (file) => {
    const uploadedUrl = await handleUpload(file);
    if (uploadedUrl) {
      setValue('thumbnail_image', uploadedUrl);
      enqueueSnackbar('Thumbnail uploaded successfully', { variant: 'success' });
    }
  }, [handleUpload, setValue, enqueueSnackbar]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="item_name" label="Item Name" />
              <RHFTextField name="item_description" label="Description" multiline rows={4} />

              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <OnlineCategoriesDropdown {...field} onChange={field.onChange} value={field.value} />
                )}
              />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Thumbnail Image</Typography>
                <RHFUpload
                  name="thumbnail_image"
                  label="Thumbnail Image"
                  onDrop={(files) => handleThumbnailUpload(files[0])}
                  isLoading={isUploading}
                  accept="image/*"
                  currentFiles={values.thumbnail_image ? [values.thumbnail_image] : []}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">List of Images</Typography>
                <RHFUpload
                  name="list_of_images"
                  label="Upload Images"
                  multiple
                  onDrop={handleImageDrop}
                  isLoading={isUploading}
                  accept="image/*"
                  currentFiles={values.list_of_images}
                />
              </Stack>

              <RHFTextField name="mrp" label="MRP" type="number" />
              <RHFTextField name="final_price" label="Final Price" type="number" />

              <RHFTextField name="gst_percentage" label="GST Percentage" type="number" />
              <RHFTextField name="gst_amount" label="GT Amount" type="number" />

              <RHFTextField name="priority" label="Priority" type="number" />

              <RHFTextField name="thumbnail_tag_1" label="Tag-1" />
              <RHFTextField name="thumbnail_tag_2" label="Tag-2" />
              <RHFTextField name="discount_tag" label="Discount Tag" />

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting || isUploading}>
                {currentItem ? 'Save Changes' : 'Create Item'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

OnlineStoreProductsNewEditForm.propTypes = {
  currentItem: PropTypes.object,
};
