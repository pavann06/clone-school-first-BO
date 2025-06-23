
import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton, Dialog, DialogContent, Typography, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function StudentsTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
  
    name,
    father_name,
    mother_name,
    dob,
    address, 
    mobile,
   
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
       {name}
        </TableCell>

        <TableCell>
          {father_name}
          
        </TableCell>

        <TableCell>
{mother_name}
</TableCell>

<TableCell>{dob}</TableCell>

<TableCell>
{address}
</TableCell>







<TableCell>
  {mobile}
</TableCell>




   

    
 
       

     



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
    <Typography
      variant="h1"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'rgba(0, 0, 0, 0.1)',
        fontSize: '5rem',
        fontWeight: 'bold',
        pointerEvents: 'none', // Prevent interaction
        userSelect: 'none',   // Prevent selection
      }}
    >
      FamiliFirst
    </Typography>

    {/* Title */}
    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
      Full Description
    </Typography>

    

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

StudentsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
