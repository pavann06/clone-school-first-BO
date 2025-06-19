


import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  Box,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
  DialogTitle,
  Select,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import request from 'src/api/request';
import { useSnackbar } from 'src/components/snackbar';

export default function EventsTableRow({ row, onEditRow, onDeleteRow }) {
  const { id, serial_no, name, description, date, time, colour_code } = row;

  const [openDialog, setOpenDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


 
  const popover = usePopover();

  const truncatedDescription =
    description?.length > 100 ? `${description.slice(0, 100)}...` : description || 'No Description';

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

 


  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell sx={{ minWidth: 300 }}>
          <Typography variant="body2">
            {truncatedDescription}{' '}
            {description.length > 100 && (
              <Button size="small" onClick={handleOpenDialog}>
                Read More
              </Button>
            )}
          </Typography>
        </TableCell>
        <TableCell>
         {date}
        </TableCell>
        <TableCell>
          {time}
        </TableCell>
        <TableCell>
          {colour_code}
        </TableCell>
     
        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

     

      {/* Dialog for read more */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>News Description</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{description}</Typography>
        </DialogContent>
        <Button onClick={handleCloseDialog}>Close</Button>
      </Dialog>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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

EventsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object.isRequired,
  
};
