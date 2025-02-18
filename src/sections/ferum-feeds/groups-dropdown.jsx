


import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import request from 'src/api/request';

const GroupsDropdown = forwardRef(({ value, onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [groups, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from the API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await request.get('backoffice/groups');
        if (response?.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          enqueueSnackbar('Failed to load groups', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching groups', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [enqueueSnackbar]);

  let menuContent;

  if (loading) {
    menuContent = <MenuItem disabled>Loading...</MenuItem>;
  } else if (groups.length === 0) {
    menuContent = <MenuItem disabled>No Groups available</MenuItem>;
  } else {
    menuContent = groups.map((group) => (
      <MenuItem key={group.id} value={group.id}>
        {group.name}
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

GroupsDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupsDropdown;



