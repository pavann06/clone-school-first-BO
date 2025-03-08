


import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import request from 'src/api/request';

const OnlineCategoriesDropdown = forwardRef(({ value, onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await request.get('backoffice/onlinestore/categories');
        if (response?.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          enqueueSnackbar('Failed to load categories', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching categories', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [enqueueSnackbar]);

  let menuContent;

  if (loading) {
    menuContent = <MenuItem disabled>Loading...</MenuItem>;
  } else if (categories.length === 0) {
    menuContent = <MenuItem disabled>No categories available</MenuItem>;
  } else {
    menuContent = categories.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.category_name}
      </MenuItem>
    ));
  }

  return (
    <Select
      ref={ref}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
    >
      {menuContent}
    </Select>
  );
});

OnlineCategoriesDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OnlineCategoriesDropdown;



