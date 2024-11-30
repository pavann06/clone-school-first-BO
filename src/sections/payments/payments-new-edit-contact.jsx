import { useQuery } from '@tanstack/react-query';
import {  useFormContext } from 'react-hook-form';
import React, { useRef, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { debounce } from '@mui/material/utils';
import Typography from '@mui/material/Typography';

import request from 'src/api/request';

import { RHFAutocomplete } from 'src/components/hook-form';

export default function PaymentsNewEditContact() {
  const { setValue, formState,watch,control } = useFormContext(); 
  const values = watch();
  const { contact } = values;

  const [inputValue, setInputValue] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const filters = {
    offset: 0,
    limit: 10,
    full_name: inputValue || '',
  };

  const { data, isLoading } = useQuery({
    queryKey: ['contacts', filters],
    queryFn: () => request.get('/contacts', filters),
    staleTime: 12 * 60 * 60 * 1000,
  });

  const handleFilterName = useRef(
    debounce((event) => {
      const value = event?.target?.value;
      setInputValue(typeof value === 'string' ? value.toLowerCase() : '');
    }, 750)
  ).current;

  const fetchContact = async (id) => {
    const response = await request.get(`/contacts`, { id });
    setSelectedContact(response?.info?.[0]);
  };

  useEffect(() => {
    if (contact) {
      fetchContact(contact);
    }
  }, [contact]);


  return (
    <Grid item xs={12} md={6}>
      <RHFAutocomplete 
        name="contact"
        label="Search Contact"
        placeholder="Search Contact"
        helperText={!selectedContact && formState.submitCount > 0 ? 'Contact is mandatory' : ''}
        control={control}
        options={isLoading ? [] : data?.info || []}
        getOptionLabel={(option) => option.full_name.toString()}
        filterSelectedOptions
        value={selectedContact}
        onChange={(event, newValue) => {
          setSelectedContact(newValue);
          setValue('contact', newValue ? newValue.id : null);
        }}
        onInputChange={handleFilterName}
        isOptionEqualToValue={(option, value) => value && option.id === value.id}
        renderOption={(props, option) => (
          <li {...props}>
            <Grid container alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {option.full_name}
              </Typography>
            </Grid>
          </li>
        )}
      />
    </Grid>
  );
}