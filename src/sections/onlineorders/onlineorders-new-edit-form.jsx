


import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { CreateOnlineOrder, UpdateOlineOrder } from 'src/api/orders';

// Form Components
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function OnlineOrdersNewEditForm({ currentCategory }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const CategorySchema = Yup.object().shape({
    remarks: Yup.string().required('Remarks are required'),
    order_status: Yup.string().required('Order status is required'),
  });

  const defaultValues = {
    remarks: currentCategory?.remarks?.note || '',
    order_status: currentCategory?.order_status || '',
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, formState: { isSubmitting } } = methods;



  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       remarks: { note: data.remarks }, // Ensure remarks follows the required format
  //     };
  
  //     const response = currentCategory
  //       ? await UpdateOlineOrder({ ...payload, id: currentCategory.id })
  //       : await CreateOnlineOrder(payload);
  
  //     if (response?.success) {
  //       enqueueSnackbar(currentCategory ? 'Update success!' : 'Create success!', { variant: 'success' });
  //       router.push(paths.dashboard.onlineorders.root);
  //       reset();
  //     } else {
  //       enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        remarks: { note: data.remarks }, // Ensure remarks follow the required format
      };
  
      const response = currentCategory
        ? await UpdateOlineOrder({ ...payload, id: currentCategory.id })
        : await CreateOnlineOrder(payload);
  
      console.log("Full API Response:", response); // Debugging
  
      if (response?.success) {
        enqueueSnackbar(currentCategory ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.onlineorders.root);
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
  
  

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              {/* Remarks Field */}
              <RHFTextField name="remarks" label="Remarks" />

              {/* Order Status Dropdown */}
              <FormControl fullWidth>
                <InputLabel>Order Status</InputLabel>
                <Select
                  name="order_status"
                  value={methods.watch('order_status')}
                  onChange={(e) => setValue('order_status', e.target.value)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {currentCategory ? 'Save Changes' : 'Create Order'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

OnlineOrdersNewEditForm.propTypes = {
  currentCategory: PropTypes.any,
};
