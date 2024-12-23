import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useResponsive } from 'src/hooks/use-responsive';

import { RHFTextField } from 'src/components/hook-form';

import ReturnsNewEditGodown from './returns-new-edit-godown';
import ReturnsNewEditCustomer from './returns-new-edit-customer';
import ReturnsNewEditDistributor from './returns-new-edit-distributor';

// ----------------------------------------------------------------------

export default function ReturnsNewEditInfo() {
  const { control, watch, setValue } = useFormContext();

  const mdUp = useResponsive('up', 'md');

  const values = watch();

  const defaultDate = values.order_date ? dayjs(values.order_date) : dayjs();

  useEffect(() => {
    if (!watch('order_date')) {
      setValue('order_date', defaultDate.toDate());
    }
  }, [defaultDate, setValue, watch]);

  return (
    <>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider
            flexItem
            orientation={mdUp ? 'vertical' : 'horizontal'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ p: 3 }}
      >
        <ReturnsNewEditCustomer />
        <ReturnsNewEditDistributor />
      </Stack>

      {/* second stack here */}
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }}>
        <RHFTextField
          name="ref_no"
          label="Reference ID"
          value={values.ref_no}
          placeholder="Enter Manual Book Reference ID"
        />

        <Controller
          name="order_date"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Sales Date"
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

        <RHFTextField
          name="truck_no"
          label="Truck No"
          value={values.truck_no}
          placeholder="Enter Truck No"
        />
      </Stack>

      {/* third stack */}
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }}>
        <RHFTextField
          name="freight_charges"
          label="Freight Charges"
          value={values.freight_charges}
          placeholder="Enter freigh charges"
          sx={{ maxWidth: { md: 250 } }}
        />

        <ReturnsNewEditGodown />

        <RHFTextField
          name="remarks"
          label="Remarks"
          value={values.remarks}
          placeholder="Enter Remarks"
          sx={{ maxWidth: { md: 300 } }}
        />
      </Stack>
    </>
  );
}
