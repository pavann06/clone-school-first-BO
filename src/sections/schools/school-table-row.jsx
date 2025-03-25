
import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton, Dialog, DialogContent, Typography, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function SchoolTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    language,
    school_name,
    school_address,
    description,
    profile_image,
    comments_count,
    whatsapp_share_count,
    posting_date,
    approved_by,
    contact_number,
    email,
    website,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
       {school_name}
        </TableCell>

        <TableCell align="center">
          {profile_image ? (
            <img
              src={profile_image}
              alt={`Thumbnail for ${school_name}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>

        <TableCell>
  {school_address ? (
    <>
      <div>{school_address.mandal}</div>
      <div>{school_address.district}</div>
      <div>{school_address.state}</div>
    </>
  ) : (
    "N/A"
  )}
</TableCell>




   

        {/* Approved Info */}
        <TableCell>
          {email}
        </TableCell>

        {/* Image */}
       

        {/* Interactions */}
        <TableCell>
       {contact_number}
        </TableCell>


        {/* Status */}
        <TableCell>{website}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Popup for Full Description */}
   
<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
  <DialogContent sx={{ position: 'relative', p: 3 }}>
    {/* Watermark */}
   

    {/* Title */}


    {/* Close Button */}
    <Button
      onClick={handleCloseDialog}
      variant="contained"
      sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
    >
      Close
    </Button>
  </DialogContent>
</Dialog>


      {/* Custom Popover */}
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

SchoolTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
