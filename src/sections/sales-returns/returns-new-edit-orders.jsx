import sum from 'lodash/sum';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import ReturnsNewEditRow from './returns-new-edit-row';

// ----------------------------------------------------------------------

export default function ReturnsNewEditOrders() {

  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const freightCharges = parseFloat(values.freight_charges);

  const totalOnRow = values.items.map((item) => item.total)

  const subTotal = sum(totalOnRow) + freightCharges;

  useEffect(() => {
    setValue('round_off', Math.round(subTotal) - subTotal);
  }
  , [setValue, subTotal]);

  const totalAmount = subTotal + values.round_off;

  useEffect(() => {
    setValue('final_amount', totalAmount);
  }, [setValue, totalAmount]);

  const handleAdd = () => {
    append({
      id: 'NEW',
      product: null,
      bags: 0,
      bag_weight:0,
      seed_class:'',
      lot_no:'',
      unit:'',
      net_weight:0,
      price: 0,
      total: 0,
    });
  };



  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <ReturnsNewEditRow key={index} item={item} index={index} remove={remove} />
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>
      </Stack>

      {/* render total - second stack */}
      <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subTotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Freight Charges</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(freightCharges) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Round Off</Box>
        <Box
          sx={{
            width: 160,
            ...(values.round_off && { color: 'error.main' }),
          }}
        >
          {values.round_off ? fCurrency(values.round_off) : '-'}
        </Box>

      </Stack>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
        <Box sx={{ width: 160 }}>{values.taxes ? fCurrency(values.taxes) : '₹0'}</Box>
      </Stack>


      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <Box>Total</Box>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '0'}</Box>
      </Stack>
    </Stack>

    </Box>
  );
}
