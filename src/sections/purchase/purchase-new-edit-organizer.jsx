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

export default function PurchaseNewEditOrganizer() {
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { watch, setValue,control} = useFormContext();
  const values = watch();
  const { organizer } = values;

  const filters = {
    offset: 0,
    limit: 10,
    role: 'SUPPLIER',
    sub_role: 'ORGANIZER',
    full_name: inputValue || '',
  };
  const { data, isLoading } = useQuery({
    queryKey: ['contacts', 'organizer', filters],
    queryFn: () => request.get('/contacts', filters),
    staleTime: 12 * 60 * 60 * 1000,
  });

  const handleFilterName = useRef(
    debounce((event) => {
      const value = event?.target?.value;
      setInputValue(typeof value === 'string' ? value.toLowerCase() : '');
    }, 750)
  ).current;

  const fetchOrganizer = async (id) => {
    const response = await request.get(`/contacts`, { id });
    setSelectedOrganizer(response?.info?.[0]);
  };

  useEffect(() => {
    if (organizer) {
      fetchOrganizer(organizer);
    }
  }, [organizer]);

  return (
    <Stack sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
          Organiser:
        </Typography>

        <RHFAutocomplete 
        name="organizer"
        label="Search Organiser"
        sx={{ width: 300 }}
        control={control}
        options={isLoading ? [] : data?.info || []}
        getOptionLabel={(option) => option.full_name.toString()}
        filterOptions={(x) => x}
        filterSelectedOptions
        value={selectedOrganizer}
        onChange={(event, newValue) => {
          setSelectedOrganizer(newValue);
          setValue('organizer', newValue ? newValue.id : null);
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

      {selectedOrganizer && (
        <Stack spacing={1}>
          <>
            <Typography variant="subtitle2">{selectedOrganizer.full_name}</Typography>
            <Typography variant="body2">{selectedOrganizer.mobile}</Typography>
            <Typography variant="body2">{selectedOrganizer.address1}</Typography>
          </>
        </Stack>
      )}
    </Stack>
  );
}
