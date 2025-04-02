import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  Link,
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

export default function EdutainmentTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    language,
    heading,
    description,
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

  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>{heading}</TableCell>

        {/* Description */}
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

        {/* Approved Info */}
        <TableCell>
          <div>Posted: {posting_date}</div>
          {/* <div>Approved By: {approved_by}</div> */}
          <div>Approved At: {new Date(approved_time).toLocaleDateString()}</div>
        </TableCell>

        {/* Image */}
        <TableCell align="center">
          {image ? (
            <img
              src={image}
              alt={`Thumbnail for ${heading}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>

        {/* Interactions */}
        <TableCell>
          <div>Likes: {likes_count}</div>
          <div>Comments: {comments_count}</div>
          <div>WhatsApp Shares: {whatsapp_share_count}</div>
        </TableCell>

        {/* Language */}
        <TableCell>{language}</TableCell>

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

EdutainmentTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
