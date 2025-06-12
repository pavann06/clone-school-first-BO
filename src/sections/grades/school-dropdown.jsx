import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

import request from 'src/api/request';

const SchoolsDropdown = forwardRef(({ value, onChange, label = 'Select School', error, helperText }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await request.get('backoffice/school');
        if (response?.success && Array.isArray(response.data)) {
          setSchools(response.data);
        } else {
          enqueueSnackbar('Failed to load schools', { variant: 'error' });
        }
      } catch (err) {
        enqueueSnackbar('Error fetching schools', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [enqueueSnackbar]);

  let menuItems;
  if (loading) {
    menuItems = <MenuItem disabled>Loading...</MenuItem>;
  } else if (schools.length === 0) {
    menuItems = <MenuItem disabled>No schools available</MenuItem>;
  } else {
    menuItems = schools.map((school) => (
      <MenuItem key={school.id} value={school.id}>
        {school.name}
      </MenuItem>
    ));
  }

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        ref={ref}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {menuItems}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

SchoolsDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default SchoolsDropdown;
