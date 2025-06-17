



//   impotst -- with satus refersh===============




import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  DialogTitle,
  Select,
} from '@mui/material';
import request from 'src/api/request';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function GallaryTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    id,
    serial_no,
    event_name,
    event_date,
    description,
    number_of_pics,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenImageDialog = (img) => {
    setSelectedImage(img);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
    setOpenImageDialog(false);
  };

  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const popover = usePopover();




  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>

        <TableCell>{event_name}</TableCell>

        <TableCell>
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
        {event_date}
        </TableCell>

      

        <TableCell>
       {number_of_pics}
        </TableCell>

   

        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Full Description Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent sx={{ position: 'relative', p: 3 }}>
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
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            FamiliFirst
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Full Description
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {description}
          </Typography>

          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Image Preview
          <IconButton
            onClick={handleCloseImageDialog}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Full preview"
              sx={{
                width: '90%',
                maxHeight: '60vh',
                objectFit: 'contain',
                borderRadius: 2,
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Action Popover */}
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

GallaryTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,

};
