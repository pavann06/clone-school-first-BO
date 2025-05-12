

import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton, Dialog, DialogContent, Typography, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function CompetitionTableRow({ row, onEditRow, onDeleteRow,onViewRow }) {
  const {
    serial_no,
    language,
    contest_name,
    contest_description,
    total_words,
    prize_pool,
    start_time,
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

 

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
       {contest_name}
        </TableCell>

        {/* Description */}
      

        {/* Approved Info */}
        <TableCell>
         {contest_description}
        </TableCell>

        {/* Image */}
        <TableCell>
        {total_words}
        </TableCell>

        {/* Interactions */}
        <TableCell>
        {prize_pool}
        </TableCell>


<TableCell>
  <div>
    {new Date(start_time).toLocaleDateString('en-US', {
      dateStyle: 'medium',
      timeZone: 'UTC',
    })}
    <br />
    {new Date(start_time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    })} 
  </div>
</TableCell>






       

   

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
  <DialogContent sx={{ position: 'relative', p: 3 }}>
   
    

  

  

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
                    onViewRow();
                    popover.onClose();
                  }}
                >
                  <Iconify icon="carbon:view" />
                  {/* <AppointmentListPage /> */}
                  Words
                </MenuItem>

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

CompetitionTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
