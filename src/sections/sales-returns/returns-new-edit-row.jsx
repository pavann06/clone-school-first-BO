import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import { Select, MenuItem, TextField, InputLabel, FormControl, FormHelperText } from '@mui/material';

import request from 'src/api/request';

import Iconify from 'src/components/iconify';
import { RHFTextField ,RHFAutocomplete} from 'src/components/hook-form';

export default function ReturnsNewEditRow({ index, item, remove }) {
  const { setValue, watch, setError, formState ,control} = useFormContext();
  const { errors } = formState;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('KG');

  const values = watch();
  const { product } = values.items[index] || {};
  const { unit } = values.items[index] || {};

  const { id } = item;

  const filters = {
    offset: 0,
    limit: 100,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => request.get('/products', filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const [fieldValues, setFieldValues] = useState({
    bags: item.bags || 0,
    bag_weight: item.bag_weight || 0,
    seed_class: item.seed_class || '',
    lot_no: item.lot_no || '',
    net_weight: item.net_weight || 0,
    price: item.price || 0,
    total: item.total || 0,
  });

  const { bags, bag_weight, seed_class, lot_no, net_weight, price, total } = fieldValues;

  const handleInputChange = useCallback(
    (field, value) => {
      setFieldValues((prev) => ({ ...prev, [field]: value }));
      setValue(`items[${index}].${field}`, value);
      if (field === 'unit') {
        setSelectedUnit(value);
      }
    },
    [setValue, index]
  );

  useEffect(() => {
    if (!watch(`items[${index}].unit`)) {
      setValue(`items[${index}].unit`, selectedUnit);
    }
  }, [setValue, watch, selectedUnit, index]);

  useEffect(() => {
    if (product) {
      const productObject = data?.info.find((p) => p.id === product);
      setSelectedProduct(productObject);
    }
  }, [data, product]);

  useEffect(() => {
    if (unit) {
      console.log(unit);
      setSelectedUnit(unit);
    }
  }, [unit]);

  useEffect(() => {
    const netWeightValue = parseFloat(bags) * parseFloat(bag_weight);
    setFieldValues((prev) => ({
      ...prev,
      net_weight: Number.isNaN(netWeightValue) ? 0 : netWeightValue,
    }));
    setValue(`items[${index}].net_weight`, Number.isNaN(netWeightValue) ? 0 : netWeightValue);
  }, [bags, bag_weight, setValue, index]);

  useEffect(() => {
    let totalValue = 0;
    if (selectedUnit === 'BAG') {
      totalValue = parseFloat(bags) * parseFloat(price);
    } else if (selectedUnit === 'KG') {
      totalValue = parseFloat(net_weight) * parseFloat(price);
    }
    totalValue = parseFloat(totalValue.toFixed(2)); // limit to 2 decimal places
    setFieldValues((prev) => ({ ...prev, total: Number.isNaN(totalValue) ? 0 : totalValue }));
    setValue(`items[${index}].total`, Number.isNaN(totalValue) ? 0 : totalValue);
  }, [index, net_weight, price, setValue, bags, selectedUnit]);

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
          name={`items[${index}].seed_class`}
          label="SEED CLASS"
          InputLabelProps={{ shrink: true }}
          value={seed_class}
          onChange={(e) => handleInputChange('seed_class', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].seed_class}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].seed_class &&
            errors.items[index].seed_class.message
          }
          sx={{ maxWidth: { md: 120 } }}
        />

        <RHFTextField
          size="small"
          name={`items[${index}].lot_no`}
          label="LOT NUMBER"
          InputLabelProps={{ shrink: true }}
          value={lot_no}
          onChange={(e) => handleInputChange('lot_no', e.target.value)}
          error={!!errors.items && !!errors.items[index] && !!errors.items[index].lot_no}
          helperText={
            errors.items &&
            errors.items[index] &&
            errors.items[index].lot_no &&
            errors.items[index].lot_no.message
          }
          sx={{ maxWidth: { md: 120 } }}
        />
        <FormControl fullWidth error={!!errors.items && !!errors.items[index] && !!errors.items[index].unit && formState.submitCount > 0}>
          <InputLabel id={`unit-label-${index}`}>UNIT</InputLabel>
          <Select
            labelId={`unit-label-${index}`}
            id={`unit-select-${index}`}
            size="small"
            value={selectedUnit}
            onChange={(event) => {
              handleInputChange('unit', event.target.value);
            }}
            label="UNIT"
          >
            <MenuItem value="KG">KG</MenuItem>
            <MenuItem value="BAG">BAG</MenuItem>
          </Select>
          {errors.items && errors.items[index] && errors.items[index].unit && (
            <FormHelperText>{errors.items[index].unit.message}</FormHelperText>
          )}
        </FormControl>
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
          sx={{ maxWidth: { md: 90 } }}
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
          sx={{ maxWidth: { md: 120 } }}
        />
        <RHFTextField
          size="small"
          type="number"
          name={`items[${index}].price`}
          label="PRICE"
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
          sx={{ maxWidth: { md: 120 } }}
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
          label="TOTAL"
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
            maxWidth: { md: 120 },
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

ReturnsNewEditRow.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};
