import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import request from 'src/api/request';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
      } catch (error) {
        enqueueSnackbar('Error fetching schools', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [enqueueSnackbar]);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        ref={ref}
        value={value || ''}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {loading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : schools.length === 0 ? (
          <MenuItem disabled>No schools available</MenuItem>
        ) : (
          schools.map((school) => (
            <MenuItem key={school.id} value={school.id}>
              {school.school_name}
            </MenuItem>
          ))
        )}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

SchoolsDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default SchoolsDropdown;
