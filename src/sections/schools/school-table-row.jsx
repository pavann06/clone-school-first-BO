

import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function SchoolTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no, name, small_logo,address, phone_number, poc_name, status,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const popover = usePopover();

  const renderAddress = () => {
  if (typeof address === 'string') return address;
  if (address && typeof address === 'object') {
    return `${address.colony || ''}, ${address.street || ''}, ${address.city || ''}, ${address.state || ''} - ${address.pincode || ''}`;
  }
  return 'N/A';
};


  return (
    <>
      <TableRow hover>
        <TableCell sx={{ width: 50 }}>{serial_no}</TableCell>
        <TableCell sx={{ width: 200 }}>{name}</TableCell>
        <TableCell align="center" sx={{ width: 120 }}>
          {small_logo ? (
            <img
              src={small_logo}
              alt={`Thumbnail for ${name}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>
  <TableCell>{renderAddress()}</TableCell>


        <TableCell >{phone_number}</TableCell>
        <TableCell >{poc_name}</TableCell>
        <TableCell >{status}</TableCell>
        <TableCell align="center" sx={{ width: 80 }}>
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent sx={{ position: 'relative', p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            onDeleteRow();
            popover.onClose();
          }}
        >
          <Iconify icon="material-symbols:delete" />
          Delete
        </MenuItem> */}
      </CustomPopover>
    </>
  );
}

SchoolTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};


