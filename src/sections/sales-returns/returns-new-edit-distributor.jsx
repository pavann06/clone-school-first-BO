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

export default function ReturnsNewEditDistributor() {
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { watch, setValue, control } = useFormContext();
  const values = watch();
  const { distributor } = values;

  const filters = {
    offset: 0,
    limit: 10,
    role: 'CUSTOMER',
    sub_role: 'DISTRIBUTOR',
    full_name: inputValue || '',
  };
  const { data, isLoading } = useQuery({
    queryKey: ['contacts', 'distributor', filters],
    queryFn: () => request.get('/contacts', filters),
    staleTime: 12 * 60 * 60 * 1000,
  });

  const handleFilterName = useRef(
    debounce((event) => {
      const value = event?.target?.value;
      setInputValue(typeof value === 'string' ? value.toLowerCase() : '');
    }, 750)
  ).current;

  const fetchDistributor = async (id) => {
    const response = await request.get(`/contacts`, { id });
    setSelectedDistributor(response?.info?.[0]);
  };

  useEffect(() => {
    if (distributor) {
      fetchDistributor(distributor);
    }
  }, [distributor]);

  return (
    <Stack sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
          Distributor:
        </Typography>

        <RHFAutocomplete
          name="distributor"
          label="Search Distributor"
          sx={{ width: 300 }}
          control={control}
          options={isLoading ? [] : data?.info || []}
          getOptionLabel={(option) => option.full_name.toString()}
          filterOptions={(x) => x}
          filterSelectedOptions
          value={selectedDistributor}
          onChange={(event, newValue) => {
            setSelectedDistributor(newValue);
            setValue('distributor', newValue ? newValue.id : null);
          }}
          onInputChange={handleFilterName}
          isOptionEqualToValue={(option, value) => option && value && option.id === value.id}
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

      {selectedDistributor && (
        <Stack spacing={1}>
          <>
            <Typography variant="subtitle2">{selectedDistributor.full_name}</Typography>
            <Typography variant="body2">{selectedDistributor.mobile}</Typography>
            <Typography variant="body2">{selectedDistributor.address1}</Typography>
          </>
        </Stack>
      )}
    </Stack>
  );
}
