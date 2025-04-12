import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import request from 'src/api/request';

const HostsDropdown = forwardRef(({ value, onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await request.get('backoffice/host');
        if (response?.success && Array.isArray(response.data)) {
          setHosts(response.data);
        } else {
          enqueueSnackbar('Failed to load hosts', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching hosts', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, [enqueueSnackbar]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const renderMenuItems = () => {
    if (loading) {
      return <MenuItem disabled>Loading...</MenuItem>;
    }

    if (hosts.length === 0) {
      return <MenuItem disabled>No hosts available</MenuItem>;
    }

    return hosts.map((host) => (
      <MenuItem key={host.id} value={host.id}>
        {host.name}
      </MenuItem>
    ));
  };

  return (
    <Select
      ref={ref}
      multiple
      value={value || []}
      onChange={handleChange}
      fullWidth
      sx={{ width: 700 }} // Set desired width here
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((hostId) => {
            const host = hosts.find((h) => h.id === hostId);
            return host ? <Chip key={host.id} label={host.name} /> : null;
          })}
        </Box>
      )}
    >
      {renderMenuItems()}
    </Select>
  );
});

HostsDropdown.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func.isRequired,
};

HostsDropdown.defaultProps = {
  value: [],
};

export default HostsDropdown;
