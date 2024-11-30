import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Select, InputLabel, FormControl } from '@mui/material';

import { RHFTextField } from 'src/components/hook-form';

import PaymentsNewEditContact from './payments-new-edit-contact';

export default function PaymentsNewEditInfo() {
  const { control, watch, setValue } = useFormContext();

  const [selectedType, setSelectedType] = useState('');

  const [selectedFor, setSelectedFor] = useState('');

  const defaultDate = watch('payment_date') ? dayjs(watch('payment_date')) : dayjs();

  const handleType = (event) => {
    setSelectedType(event.target.value);
    setValue('payment_type', event.target.value)
  }

  const handlePaymentFor = (event) => {
    setSelectedFor(event.target.value);
    setValue('payment_for', event.target.value);
  }

  useEffect(() => {
    if (!watch('payment_date')) {
      setValue('payment_date', defaultDate.toDate());
    }
  }, [defaultDate, setValue, watch]);

  return (
    <Grid container spacing={3}>
      <PaymentsNewEditContact />

      <Grid item xs={12} md={6}>
        <RHFTextField name="amount" label="Amount" />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="payment-type-label0">TYPE</InputLabel>
          <Select
            name="payment_type"
            labelId="payment-type-label0"
            id='payment_type'
            value={selectedType}
            onChange={handleType}>
            <MenuItem value='DEBIT'>DEBIT</MenuItem>
            <MenuItem value='CREDIT'>CREDIT</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="payment-for-label">PAYMENT FOR</InputLabel>
          <Select
            name="payment_for"
            labelId='payment-for-label'
            id='payment-for'
            value={selectedFor}
            onChange={handlePaymentFor}>
            <MenuItem value='PURCHASE'>PURCHASE</MenuItem>
            <MenuItem value='SALES'>SALES</MenuItem>
            <MenuItem value='SALES-RETURN'>SALES-RETURN</MenuItem>
            <MenuItem value='OFFICE-EXPENSE'>OFFICE-EXPENSE</MenuItem>
            <MenuItem value='TRANSPORT-EXPENSE'>TRANSPORT-EXPENSE</MenuItem>
            <MenuItem value='OTHERS'>OTHERS</MenuItem>
          </Select>
        </FormControl>

      </Grid>

      <Grid item xs={12} md={6}>
        <RHFTextField
          name="remarks"
          label="Remarks"
          value={watch('remarks') || ''}
          placeholder="Enter Remarks"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="payment_date"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Payment Date"
              value={defaultDate}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
