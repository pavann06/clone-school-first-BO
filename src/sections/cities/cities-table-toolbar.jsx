import { useRef } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CitiesTableToolbar({ filters, setFilters }) {
  const handleFilterName = useRef(
    debounce((event) => {
      setFilters((prev) => ({
        ...prev,
        offset: 0,
        city_name: event.target.value.toLowerCase(),
      }));
    }, 750)
  ).current;

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
        <TextField
          fullWidth
          value={filters.name}
          onChange={handleFilterName}
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

CitiesTableToolbar.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.any,
};
