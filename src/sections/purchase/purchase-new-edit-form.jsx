import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';

import FormProvider from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

import PurchaseNewEditInfo from './purchase-new-edit-info';
import PurchaseNewEditOrders from './purchase-new-edit-orders';

// ----------------------------------------------------------------------

export default function PurchaseNewEditForm({ currentPurchase }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewPurchaseSchema = Yup.object().shape({
    supplier: Yup.mixed().required('supplier is required'),
    order_date: Yup.mixed().nullable().required('order date is required'),
    ref_no: Yup.string().required('ref no is required'),
    final_amount: Yup.number()
      .positive('Final amount must be a positive number')
      .required('Final amount is required'),
    // not required
    organizer: Yup.mixed(),
    truck_no: Yup.string(),
    weight_loss: Yup.number(),
    way_bridge_no: Yup.string(),
    godown: Yup.string(),
    remarks: Yup.string(),
    items: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required('id is required'),
          product: Yup.string().required('product is required'),
          bags: Yup.string().required('bag is required'),
          bag_weight: Yup.string().required('bag weight is required'),
          gross_weight: Yup.string().required('gross weight is required'),
          net_weight: Yup.string().required('net weight is required'),
          weight_loss: Yup.string().required('weight loss is requried'),
          price: Yup.number().required('price is required'),
          total: Yup.number().required('total is required'),
        })
      )
      .optional(),
  });

  const defaultValues = useMemo(
    () => ({
      supplier: currentPurchase?.supplier || null,
      organizer: currentPurchase?.organizer || '',
      order_date: currentPurchase?.order_date || null,
      final_amount: currentPurchase?.final_amount || 0,
      ref_no: currentPurchase?.ref_no || '',
      truck_no: currentPurchase?.truck_no || '',
      weight_loss: currentPurchase?.weight_loss || 0,
      way_bridge_no: currentPurchase?.way_bridge_no || '',
      godown: currentPurchase?.godown || '',
      remarks: currentPurchase?.remarks || 'NA',
      discount: currentPurchase?.discount || 0,
      items: currentPurchase?.items || [
        {
          id: 'NEW',
          product: null,
          bags: 0,
          bag_weight: 0,
          gross_weight: 0,
          weight_loss: 0,
          net_weight: 0,
          price: 0,
          total: 0,
        },
      ],
    }),
    [currentPurchase]
  );

  const methods = useForm({
    resolver: yupResolver(NewPurchaseSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (data) => {
    try {
      const originalTimestamp = data.order_date;
      data.order_date = dayjs(originalTimestamp).format('YYYY-MM-DD');
      console.info('FORM-DATA', JSON.stringify(data, null, 2));

      // if update purchase
      let response = {};
      if (currentPurchase) {
        data.purchase_id = currentPurchase.id;
        response = await request.put('purchases', data);
      }
      // if create purchase
      else {
        response = await request.post('purchases', data);
      }

      const { success } = response;
      if (success) {
        enqueueSnackbar(currentPurchase ? 'Purchase Update success!' : 'Purchase Create success!');
        // reset form
        reset();
        // invalidate cache
        queryClient.invalidateQueries(['purchases']);
        // push to purchase list
        router.push(paths.dashboard.purchase.root);
        return response;
      }
      enqueueSnackbar('Purchase Create failed!');

      return response;
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Purchase Create failed from user!');
    }
    return null;
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <PurchaseNewEditInfo />
        <PurchaseNewEditOrders />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentPurchase ? 'Update' : 'Create'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

PurchaseNewEditForm.propTypes = {
  currentPurchase: PropTypes.object,
};
