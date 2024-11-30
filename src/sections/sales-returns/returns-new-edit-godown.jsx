import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import request from 'src/api/request';

import { RHFAutocomplete } from 'src/components/hook-form';

export default function ReturnsNewEditGodown() {
  const [selectedGodown, setSelectedGodown] = useState(null);

  const { watch, setValue, formState,control } = useFormContext();
  const values = watch();
  const { godown } = values;

  const { data, isLoading } = useQuery({
    queryKey: ['godowns'],
    queryFn: () => request.get('/godowns'),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const fetchGodown = async (id) => {
    const response = await request.get(`/godowns`, { id });
    setSelectedGodown(response?.info?.[0]);
  };

  useEffect(() => {
    if (godown) {
      fetchGodown(godown);
    }
  }, [godown]);

  return (
    <RHFAutocomplete 
    name="godown"
    label="GoDown"
    sx={{ width: 300 }}
    placeholder="Search GoDown"
    helperText={!selectedGodown && formState.submitCount > 0 ? 'Godown is mandatory' : ''}
    control={control}
    options={isLoading ? [] : data?.info || []}
    getOptionLabel={(option) => option.godown_name.toString()}
    filterSelectedOptions
    value={selectedGodown}
    onChange={(event, newValue) => {
      setSelectedGodown(newValue);
      setValue('godown', newValue ? newValue.id : null);
    }}
    isOptionEqualToValue={(option, value) => value && option.id === value.id}
    renderOption={(props, option) => (
      <li {...props}>
        <Grid container alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {option.godown_name}
          </Typography>
        </Grid>
      </li>
    )}
  />
  );
}
