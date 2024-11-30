import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SpecialitiesTableToolbar({ filters, setFilters }) {
  const [searchTerm, setSearchTerm] = useState(filters.speciality_name);

  const handleFilterName = useRef(
    debounce((value) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        offset: 0,
        speciality_name: value.toLowerCase(),
      }));
    }, 750)
  ).current;

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleFilterName(value);
  };

  const handleEntityChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      offset: 0,
      speciality_for: event.target.value,
    }));
  };

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <Select value={filters.speciality_for} onChange={handleEntityChange} sx={{ width: 0.5 }}>
          <MenuItem value="DOCTOR">DOCTOR</MenuItem>
          <MenuItem value="HOSPITAL">HOSPITAL</MenuItem>
        </Select>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}

SpecialitiesTableToolbar.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.any,
};
