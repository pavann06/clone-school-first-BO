import dayjs from 'dayjs';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ReturnsTableToolbar({
  filters,
  setFilters,
  //
}) {
  const popover = usePopover();

  const handleFilterProduct = useRef(
    debounce((event) => {
      setFilters((prev) => ({
        ...prev,
        offset: 0,
        product_name: event.target.value.toLowerCase(),
      }));
    }, 750)
  ).current;

  const handleFilterCustomer = useRef(
    debounce((event) => {
      setFilters((prev) => ({
        ...prev,
        offset: 0,
        customer_name: event.target.value.toLowerCase(),
      }));
    }, 750)
  ).current;

  const handleFilterDistributor = useRef(
    debounce((event) => {
      setFilters((prev) => ({
        ...prev,
        offset: 0,
        distributor_name: event.target.value.toLowerCase(),
      }));
    }, 750)
  ).current;

  const handleInvoiceNo = useRef(
    debounce((event) => {
      setFilters((prev) => ({
        ...prev,
        offset: 0,
        order_no: event.target.value,
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
        alignItems={{ xs: 'flex-end', md: 'center' }}
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

        {showFilters && (
          <>
            <Stack
              spacing={1}
              alignItems={{ xs: 'flex-end', md: 'center' }}
              direction={{
                xs: 'column',
                md: 'row',
              }}
              sx={{
                p: 2.0,
                pr: { xs: 2.5, md: 1 },
              }}
            >
              {/* First stack of filters */}
              <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
                <TextField
                  fullWidth
                  value={filters.name}
                  onChange={handleFilterProduct}
                  placeholder="Product..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  value={filters.name}
                  onChange={handleFilterCustomer}
                  placeholder="Customer.."
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

            <Stack
              spacing={1}
              alignItems={{ xs: 'flex-end', md: 'center' }}
              direction={{
                xs: 'column',
                md: 'row',
              }}
              sx={{
                p: 2.0,
                pr: { xs: 2.5, md: 1 },
              }}
            >
              {/* Second stack of filters */}
              <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
                <TextField
                  fullWidth
                  value={filters.name}
                  onChange={handleFilterDistributor}
                  placeholder="Distributor.."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  value={filters.name}
                  onChange={handleInvoiceNo}
                  placeholder="Invoice no.."
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
            <Stack
              spacing={1}
              alignItems={{ xs: 'flex-end', md: 'center' }}
              direction={{
                xs: 'column',
                md: 'row',
              }}
              sx={{
                p: 2.0,
                pr: { xs: 2.5, md: 1 },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
                <DatePicker
                  label="Start Date"
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
              </Stack>
            </Stack>
          </>
        )}
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
  );
}

ReturnsTableToolbar.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};
