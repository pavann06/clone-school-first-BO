import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  Link,
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
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function NewsTableRow({ row, onEditRow, onDeleteRow }) {
  const { serial_no, language, title, description, categories, heading, images, status } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // 🆕 At the top inside your component:
const [openImageDialog, setOpenImageDialog] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

// 🆕 Handlers
const handleOpenImageDialog = (imageUrl) => {
  setSelectedImage(imageUrl);
  setOpenImageDialog(true);
};

const handleCloseImageDialog = () => {
  setOpenImageDialog(false);
  setSelectedImage(null);
};


  const truncatedDescription =
    description?.length > 100 ? `${description.slice(0, 100)}...` : description || 'No Description';

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>{title}</TableCell>

        {/* Description */}
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
          <Box>
            {Array.isArray(categories) ? (
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Typography variant="body2">{category}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              categories
            )}
          </Box>
        </TableCell>

        {/* Image */}
        {/* <TableCell>
  {images ? (
    <img
      src={images}
      alt={`Thumbnail for ${heading}`}
      style={{ maxWidth: 100, maxHeight: 50, cursor: 'pointer' }}
      onClick={() => handleOpenImageDialog(images)} // Open dialog on click
      role="button" // Role button for accessibility
      tabIndex="0" // Make the image focusable
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { // Handle keyboard events
          handleOpenImageDialog(images);
        }
      }}
    />
  ) : (
    'No Image'
  )}
</TableCell> */}
   <TableCell align="center">
          {images ? (
            <Box
              role="button"
              tabIndex={0}
              onClick={() => handleOpenImageDialog(images)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenImageDialog(images);
                }
              }}
              sx={{ display: 'inline-block', cursor: 'pointer', outline: 'none' }}
              aria-label={`View image for ${heading}`}
            >
              <img
                src={images}
                alt={`Thumbnail for ${heading}`}
                style={{ maxWidth: 100, maxHeight: 50 }}
              />
            </Box>
          ) : (
            'No Image'
          )}
        </TableCell>



        {/* Status */}
        <TableCell>{status}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
              userSelect: 'none', // Prevent selection
            }}
          >
            FamiliFirst
          </Typography>

          {/* Title */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Full Description
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 4 }}>
            {description}
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

NewsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
