import dayjs from 'dayjs';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Select, Button, InputLabel, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function PaymentsTableToolbar({ filters, setFilters }) {
  const popover = usePopover();

  const [type, setType] = useState('');

  const handleFilterType = (event) => {
    setType(event.target.value);
    setFilters((prev) => ({
      ...prev,
      offset: 0,
      payment_type: event.target.value,
    }));
  };
  const handleFilterContact = useRef(
    debounce((event) => {
      setFilters((prev) => ({
        ...prev,
        offset: 0,
        contact_name: event.target.value.toLowerCase(),
      }));
    }, 750)
  ).current;

  const handleFilterStartDate = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      start_date: dayjs(date).format('YYYY-MM-DD'),
      offset: 0,
    }));
  };

  const handleFilterEndDate = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      end_date: dayjs(date).format('YYYY-MM-DD'),
      offset: 0,
    }));
  };

  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <Stack
        spacing={1}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.0,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <Button onClick={handleToggleFilters} variant="outlined">
          {showFilters ? 'Hide' : 'Filters'}
        </Button>
      </Stack>
      {showFilters && (
        <>
          <Stack
            spacing={2}
            alignItems={{ xs: 'space-between', md: 'center' }}
            direction={{
              xs: 'column',
              md: 'row',
            }}
            sx={{
              p: 3,
              pr: { xs: 3, md: 2 },
            }}
          >
            <DatePicker
              label="Start Date"
              fullWidth
              value={filters.start_date ? dayjs(filters.start_date) : null}
              onChange={handleFilterStartDate}
              maxDate={filters.end_date ? dayjs(filters.end_date) : null}
              textField={(props) => (
                <TextField
                  {...props}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <DatePicker
              label="End Date"
              fullWidth
              value={filters.end_date ? dayjs(filters.end_date) : null}
              onChange={handleFilterEndDate}
              minDate={filters.start_date ? dayjs(filters.start_date) : null}
              textField={(props) => (
                <TextField
                  {...props}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="payment-type-label">TYPE</InputLabel>
                <Select
                  labelId="payment-type-label"
                  id="payment-type"
                  sx={{ width: '100%', height: '100%', maxWidth: { md: 150 } }}
                  value={type}
                  label="TYPE"
                  onChange={handleFilterType}
                >
                  <MenuItem value="DEBIT">DEBIT</MenuItem>
                  <MenuItem value="CREDIT">CREDIT</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                value={filters.name}
                onChange={handleFilterContact}
                placeholder="Search Contact."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <IconButton onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Stack>
          </Stack>

          <CustomPopover
            open={popover.open}
            onClose={popover.onClose}
            arrow="right-top"
            sx={{ width: 140 }}
          >
            <MenuItem
              onClick={() => {
                popover.onClose();
              }}
            >
              <Iconify icon="solar:printer-minimalistic-bold" />
              Print
            </MenuItem>

            <MenuItem
              onClick={() => {
                popover.onClose();
              }}
            >
              <Iconify icon="solar:export-bold" />
              Export
            </MenuItem>
          </CustomPopover>
        </>
      )}
    </>
  );
}

PaymentsTableToolbar.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};
