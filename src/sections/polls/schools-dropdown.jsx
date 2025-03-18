

import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import request from 'src/api/request';

const SchoolsDropdown = forwardRef(({ value, onChange }, ref) => {
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

  const handleChange = (event) => {
    const selectedValues = event.target.value;
    if (selectedValues.includes('All')) {
      onChange(['All']);
    } else {
      onChange(selectedValues);
    }
  };

  let menuContent;
  if (loading) {
    menuContent = <MenuItem disabled>Loading...</MenuItem>;
  } else if (schools.length === 0) {
    menuContent = <MenuItem disabled>No schools available</MenuItem>;
  } else {
    menuContent = [
      <MenuItem key="all" value="All">ALL</MenuItem>,
      ...schools.map((school) => (
        <MenuItem key={school.id} value={school.id}>
          {school.school_name}
        </MenuItem>
      )),
    ];
  }

  return (
    <Select
      ref={ref}
      multiple
      value={value.includes('All') ? ['All'] : value}
      onChange={handleChange}
      fullWidth
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.includes('All') ? (
            <Chip key="all" label="ALL" />
          ) : (
            selected.map((schoolId) => {
              const selectedSchool = schools.find((s) => s.id === schoolId);
              return selectedSchool ? (
                <Chip key={schoolId} label={selectedSchool.school_name} />
              ) : null;
            })
          )}
        </Box>
      )}
    >
      {menuContent}
    </Select>
  );
});

SchoolsDropdown.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolsDropdown;
