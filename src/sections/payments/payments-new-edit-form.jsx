import dayjs from 'dayjs';
import * as Yup from 'yup';
import 'dayjs/locale/en-gb';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';

import FormProvider from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

import PaymentsNewEditInfo from './payments-new-edit-info';

// ----------------------------------------------------------------------

export default function PaymentsNewEditForm({ currentPayment }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewPaymentsSchema = Yup.object().shape({
    contact: Yup.mixed().required('contact is required'),
    amount: Yup.mixed().required('amount is required'),
    payment_type: Yup.string().required('type required'),
    payment_for: Yup.string().required('select from below'),
    remarks: Yup.string().required('remarks rquried'),
    payment_date: Yup.mixed().required('date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      contact: currentPayment?.contact || null,
      amount: currentPayment?.amount || 0,
      payment_type: currentPayment?.payment_type || 'DEBIT',
      payment_for: currentPayment?.payment_for || 'PURCHASE',
      remarks: currentPayment?.remarks || 'NA',
      payment_date: currentPayment?.payment_date || null,
    }),
    [currentPayment]
  );

  const methods = useForm({
    resolver: yupResolver(NewPaymentsSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (data) => {
    console.log(data);
    try {
      const originalTimestamp = data.payment_date;
      data.payment_date = dayjs(originalTimestamp).format('YYYY-MM-DD');
      console.info('FORM-DATA', JSON.stringify(data, null, 2));

      // if update purchase
      let response = {};
      if (currentPayment) {
        data.payment_id = currentPayment.id;
        response = await request.put('payments', data);
      }
      // if create purchase
      else {
        response = await request.post('payments', data);
      }

      const { success } = response;
      if (success) {
        enqueueSnackbar(currentPayment ? 'Payment Update success!' : 'Payment Create success!');
        // reset form
        reset();
        // invalidate cache
        queryClient.invalidateQueries(['payments']);
        // push to purchase list
        router.push(paths.dashboard.payments.root);
        return response;
      }
      enqueueSnackbar('Payment Create failed!');

      return response;
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Payment Create failed from user!');
    }
    return null;
  });

  return (
    <FormProvider methods={methods}>
      <PaymentsNewEditInfo />

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentPayment ? 'Update' : 'Create'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

PaymentsNewEditForm.propTypes = {
  currentPayment: PropTypes.object,
};
