import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import React, { useRef, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { debounce } from '@mui/material/utils';
import Typography from '@mui/material/Typography';

import request from 'src/api/request';

import { RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ReturnsNewEditCustomer() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { watch, setValue, formState ,control} = useFormContext();
  const values = watch();
  const { customer } = values;

  const filters = {
    offset: 0,
    limit: 10,
    role: 'CUSTOMER',
    full_name: inputValue || '',
  };
  const { data, isLoading } = useQuery({
    queryKey: ['contacts', 'customer', filters],
    queryFn: () => request.get('/contacts', filters),
    staleTime: 12 * 60 * 60 * 1000,
  });

  const handleFilterName = useRef(
    debounce((event) => {
      const value = event?.target?.value;
      setInputValue(typeof value === 'string' ? value.toLowerCase() : '');
    }, 750)
  ).current;

  const fetchCustomer = async (id) => {
    const response = await request.get(`/contacts`, { id });
    setSelectedCustomer(response?.info?.[0]);
  };

  useEffect(() => {
    if (customer) {
        fetchCustomer(customer);
    }
  }, [customer]);

  return (
    <Stack sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
          Customer:
        </Typography>

        <RHFAutocomplete
          name="customer"
          label="Search Customer"
          sx={{ width: 300 }}
          helperText={!selectedCustomer && formState.submitCount > 0 ? 'Customer is mandatory' : ''}
          control={control}
          options={isLoading ? [] : data?.info || []}
          getOptionLabel={(option) => option.full_name.toString()}
          filterOptions={(x) => x}
          filterSelectedOptions
          value={selectedCustomer}
          onChange={(event, newValue) => {
            setSelectedCustomer(newValue);
            setValue('customer', newValue ? newValue.id : null);
          }}
          onInputChange={handleFilterName}
          isOptionEqualToValue={(option, value) => value && option.id === value.id}
          renderOption={(props, option) => (
            <li {...props}>
              <Grid container alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {`${option.full_name} - ${option.mobile}`}
                </Typography>
              </Grid>
            </li>
          )}
        />
      </Stack>
      {selectedCustomer && (
        <Stack spacing={1}>
          <>
            <Typography variant="subtitle2">{selectedCustomer.full_name}</Typography>
            <Typography variant="body2">{selectedCustomer.mobile}</Typography>
            <Typography variant="body2">{selectedCustomer.address1}</Typography>
          </>
        </Stack>
      )}
    </Stack>
  );
}
