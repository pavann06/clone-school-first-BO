

import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton, Dialog, DialogContent, Typography, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function WebinarTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    language,
    name,
    description,
    audience,
    total_slots,
    entry_fee,
    duration,
    likes_count,
    comments_count,
    whatsapp_share_count,
    posting_date,
    approved_by,
    approved_time,
    image,
    status,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  let truncatedDescription = "No description available";
  if (typeof description === "string" && description.length > 0) {
    truncatedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;
  }
 


  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
       {name}
        </TableCell>

    
<TableCell>
  <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
    {truncatedDescription}{' '}
    {typeof description === 'string' && description.length > 100 && (
  <Button size="small" onClick={handleOpenDialog}>
    Read More
  </Button>
)}

  </Typography>
</TableCell>


        {/* Approved Info */}
        <TableCell>
         {audience}
        </TableCell>

     
        {/* Interactions */}
        <TableCell>
         {entry_fee}
        </TableCell>

        {/* Language */}
        <TableCell>
         {duration}
        </TableCell>

        {/* Status */}

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

    
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
  <DialogContent sx={{ position: 'relative', p: 3 }}>
    {/* Watermark */}
    <Typography
      variant="h1"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'rgba(0, 0, 0, 0.05)',
        fontSize: { xs: '3rem', sm: '5rem' },
        fontWeight: 'bold',
        textAlign: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      FamilyFirst
    </Typography>

    {/* Title */}
    <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
      Webinar Description
    </Typography>

    {/* Description */}
    <Typography variant="body1" sx={{ mb: 4, textAlign: 'justify', lineHeight: 1.6 }}>
      {description}
    </Typography>

    {/* Close Button */}
    <Button
      onClick={handleCloseDialog}
      variant="contained"
      sx={{
        display: 'block',
        ml: 'auto',
        mr: 'auto',
        p: 1,
        width: '120px',
      }}
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

WebinarTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
