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

import SalesNewEditInfo from './sales-new-edit-info';
import SalesNewEditOrders from './sales-new-edit-orders';

// ----------------------------------------------------------------------

export default function SalesNewEditForm({ currentSale }) {

  const queryClient = useQueryClient();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();


  const NewSalesSchema = Yup.object().shape({
    customer: Yup.mixed().required('supplier is required'),
    order_date: Yup.mixed().nullable().required('order date is required'),
    ref_no: Yup.string().required('ref no is required'),
    freight_charges: Yup.number().required('charges are req'),
    godown:Yup.string().required('godown is requried'),
    final_amount: Yup.number().positive('Final amount must be a positive number').required('Final amount is required'),
    // not required
    distributor: Yup.mixed(),
    truck_no: Yup.string(),
    remarks: Yup.string(),
    items: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().required('id is required'),
        product: Yup.string().required('product is required'),
        seed_class:Yup.string().required('seed_class is req'),
        lot_no:Yup.string().required('lot_no is req'),
        unit:Yup.string().required('unit is req'),
        bags: Yup.string().required('bag is required'),
        bag_weight: Yup.string().required('bag weight is required'),
        net_weight: Yup.string().required('net weight is required'),
        price: Yup.number().required('price is required'),
        total: Yup.number().required('total is required'),
      })
    ).optional(),

  });

  const defaultValues = useMemo(
    () => ({
      customer: currentSale?.customer || null,
      distributor: currentSale?.distributor || '',
      order_date: currentSale?.order_date || null,
      final_amount: currentSale?.final_amount || 0,
      ref_no: currentSale?.ref_no || '',
      truck_no: currentSale?.truck_no || '',
      freight_charges: currentSale?.freight_charges || 0,
      godown:currentSale?.godown || '',
      remarks: currentSale?.remarks || 'NA',
      items: currentSale?.items || [
        {
          id: 'NEW',
          product: null,
          seed_class:'',
          lot_no:'',
          unit:null,
          bags: 0,
          bag_weight:0,
          net_weight:0,
          price: 0,
          total: 0,
        },
      ],
    }),
    [currentSale]
  );


  const methods = useForm({
    resolver: yupResolver(NewSalesSchema),
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
      let response = {}
      if(currentSale){
        data.sale_id = currentSale.id
        response = await request.put('sales', data)
      }
      // if create purchase
      else{
        response = await request.post('sales',data)
      }

      const { success} = response;
      if (success) {
        enqueueSnackbar(currentSale ? 'Sale Update success!' : 'Sale Create success!');
        // reset form
        reset();
        // invalidate cache
        queryClient.invalidateQueries(['sales']);
        // push to purchase list
        router.push(paths.dashboard.sales.root);
        return response;
      }
      enqueueSnackbar('Sale Create failed!');

      return response;

    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Sales Create failed from user!');
    }
    return null;
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <SalesNewEditInfo />
        <SalesNewEditOrders />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>

        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentSale ? 'Update' : 'Create'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

SalesNewEditForm.propTypes = {
    currentSale: PropTypes.object,
};
