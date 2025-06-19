

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
import { Tab } from '@mui/icons-material';

export default function SchoolInfoTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no, title,school, short_description,long_description, image, priority, status,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const popover = usePopover();




  return (
    <>
      <TableRow hover>
        <TableCell sx={{ width: 50 }}>{serial_no}</TableCell>
        <TableCell sx={{ width: 200 }}>{title}</TableCell>
        <TableCell>
          {school}
        </TableCell>
        <TableCell>
          {short_description}
        </TableCell>
        <TableCell>
          {long_description}
        </TableCell>
        <TableCell>
          {image}
        </TableCell>
        
        
          <TableCell >{status}</TableCell>
        <TableCell>
          {priority}
        </TableCell>
  
      
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
        <MenuItem
          onClick={() => {
            onDeleteRow();
            popover.onClose();
          }}
        >
          <Iconify icon="material-symbols:delete" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

SchoolInfoTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};


