import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import request from 'src/api/request';

import Iconify from 'src/components/iconify';
import { RHFTextField , RHFAutocomplete} from 'src/components/hook-form';

export default function PurchaseNewEditRow({ index, item, remove }) {
  const { setValue, watch, setError, formState,control } = useFormContext();
  const { errors } = formState;

  const [selectedProduct, setSelectedProduct] = useState(null);

  const values = watch();
  const { product } = values.items[index] || {};


  const { id } = item;

  const filters = {
    offset: 0,
    limit: 100,
    is_active: 'True',
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => request.get('/products', filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const [fieldValues, setFieldValues] = useState({
    bags: item.bags || 0,
    bag_weight: item.bag_weight || 0,
    gross_weight: item.gross_weight || 0,
    weight_loss: item.weight_loss || 0,
    net_weight: item.net_weight || 0,
    price: item.price || 0,
    total: item.total || 0,
  });

  const { bags, bag_weight, gross_weight, weight_loss, net_weight, price, total } = fieldValues;

  const handleInputChange = useCallback(
    (field, value) => {
      setFieldValues((prev) => ({ ...prev, [field]: value }));
      setValue(`items[${index}].${field}`, value);
    },
    [setValue, index]
  );

  useEffect(() => {
    if (product) {
      const productObject = data?.info.find(p => p.id === product);
      setSelectedProduct(productObject);
    }
  }, [data, product]);

  useEffect(() => {
    const netWeightValue =
      parseFloat(gross_weight) -
      (parseFloat(bags) * parseFloat(bag_weight)) - parseFloat(weight_loss);
    setFieldValues((prev) => ({
      ...prev,
      net_weight: Number.isNaN(netWeightValue) ? 0 : netWeightValue,
    }));
    setValue(`items[${index}].net_weight`, Number.isNaN(netWeightValue) ? 0 : netWeightValue);
  }, [bags, bag_weight, gross_weight, weight_loss, setValue, index]);

  useEffect(() => {
    const totalValue = parseFloat((parseFloat(net_weight) * parseFloat(price)).toFixed(2));
    setFieldValues((prev) => ({ ...prev, total: Number.isNaN(totalValue) ? 0 : totalValue }));
    setValue(`items[${index}].total`, Number.isNaN(totalValue) ? 0 : totalValue);
  }, [index, net_weight, price, setValue]);

  const handleRemove = () => {
    remove(index);
  };

  return (
    <Stack key={id} alignItems="flex-end" spacing={1.5}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
        <RHFAutocomplete
          name={`items[${index}].product`} 
          placeholder="Search Products"
          control={control}
          sx={{ width: '100%', maxWidth: { md: 500 } }}
          options={isLoading ? [] : data?.info}
          getOptionLabel={(option) => (option ? option.product_name : '')}
          value={selectedProduct}
          onChange={(event, newValue) => {
            setSelectedProduct(newValue);
            if (newValue) {
              setValue(`items[${index}].product`, newValue.id);
              setError(`items[${index}].product`, { type: 'manual', message: '' });
            } else {
              setValue(`items[${index}].product`, '');
              setError(`items[${index}].product`, { type: 'manual', message: 'Product is required' });
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Products"
              fullWidth
              error={!!errors.items && !!errors.items[index] && !!errors.items[index].product && formState.submitCount > 0}
              helperText={
                errors.items &&
                errors.items[index] &&
                errors.items[index].product &&
                errors.items[index].product.message
              }
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <Grid container alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {option.product_name}
                </Typography>
              </Grid>
            </li>
          )}
        />

        <RHFTextField
          size="small"
          name={`items[${index}].bags`}
          label="BAGS"
          InputLabelProps={{ shrink: true }}
          value={bags}
          onChange={(e) => handleInputChange('bags', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].bags}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].bags &&
            errors.items[index].bags.message
          }
          sx={{ maxWidth: { md: 80 } }}
        />
        <RHFTextField
          size="small"
          name={`items[${index}].bag_weight`}
          label="BAG WEIGHT"
          InputLabelProps={{ shrink: true }}
          value={bag_weight}
          onChange={(e) => handleInputChange('bag_weight', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].bag_weight}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].bag_weight &&
            errors.items[index].bag_weight.message
          }
          sx={{ maxWidth: { md: 105 } }}
        />

        <RHFTextField
          size="small"
          name={`items[${index}].gross_weight`}
          label="GROSS WEIGHT"
          InputLabelProps={{ shrink: true }}
          value={gross_weight}
          onChange={(e) => handleInputChange('gross_weight', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].gross_weight}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].gross_weight &&
            errors.items[index].gross_weight.message
          }
          sx={{ maxWidth: { md: 120 } }}
        />

        <RHFTextField
          size="small"
          name={`items[${index}].weight_loss`}
          label="WEIGHT LOSS"
          InputLabelProps={{ shrink: true }}
          value={weight_loss}
          onChange={(e) => handleInputChange('weight_loss', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].weight_loss}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].weight_loss &&
            errors.items[index].weight_loss.message
          }
          sx={{ maxWidth: { md: 120 } }}
        />

        <RHFTextField
          size="small"
          type="number"
          name={`items[${index}].price`}
          label="Price"
          placeholder="0.00"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>₹</Box>
              </InputAdornment>
            ),
          }}
          value={price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].price}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].price &&
            errors.items[index].price.message
          }
          sx={{ maxWidth: { md: 96 } }}
        />
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ width: 1 }}
        justifyContent="flex-end"
      >
        <RHFTextField
          disabled
          size="small"
          name={`items[${index}].net_weight`}
          label="NET WEIGHT"
          InputLabelProps={{ shrink: true }}
          value={net_weight}
          sx={{ maxWidth: { md: 120 } }}
        />

        <RHFTextField
          disabled
          size="small"
          type="number"
          name={`items[${index}].total`}
          label="Total"
          placeholder="0.00"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>₹</Box>
              </InputAdornment>
            ),
          }}
          value={total}
          sx={{
            maxWidth: { md: 96 },
            [`& .${inputBaseClasses.input}`]: {
              textAlign: { md: 'right' },
            },
          }}
        />
      </Stack>

      <Button
        size="small"
        color="error"
        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        onClick={handleRemove}
      >
        Remove
      </Button>
    </Stack>
  );
}

PurchaseNewEditRow.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};
