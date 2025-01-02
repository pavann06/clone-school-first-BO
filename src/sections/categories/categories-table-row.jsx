


import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import {
  TableRow,
  TableCell,
  MenuItem,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Button,
  Link,
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

function CategoriesTableRow({ row, onEditRow, onDeleteRow, serialNumber }) {
  const popover = usePopover();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleViewRow = useCallback(
    (id) => {
      router.push(`/dashboard/calender/view/${id}`);
    },
    [router]
  );

  // Truncate description to 100 characters or 3 lines
  const truncatedDescription =
    row.description && row.description.length > 100
      ? `${row.description.slice(0, 100)}...`
      : row.description;

  return (
    <>
      <TableRow hover>
        {/* Serial Number */}
        <TableCell>{serialNumber}</TableCell>

        {/* Prompt */}
        <TableCell
         
          
        >
          {row.display_name}
        </TableCell>

        {/* Benefit */}
        <TableCell >{row.status}</TableCell>

        {/* Description */}
       


       
      

        {/* Image */}
      

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

    

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

CategoriesTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    display_name: PropTypes.string,
    status: PropTypes.string,
    
    description: PropTypes.string,
    youtube_video_url: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
  }),
  serialNumber: PropTypes.number, // Serial Number of the row
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

CategoriesTableRow.defaultProps = {
  row: { id: null },
  serialNumber: null, // Default value for serial number
  onEditRow: () => {},
  onDeleteRow: () => {},
};

export default CategoriesTableRow;
