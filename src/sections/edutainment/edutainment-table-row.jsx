

import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton, Link , MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
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
  } = row;

  const popover = usePopover();
  

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {heading}
              </Link>
            }
          />
        </TableCell>

             {/* Description */}
             <TableCell>{description}</TableCell>
              


              <TableCell>
          <div>Posted: {posting_date}</div>
          <div>Approved By: {approved_by}</div>
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
        <TableCell>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {language}
              </Link>
            }
          />
        </TableCell>

       
    

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
  // onViewRow: PropTypes.func,
  row: PropTypes.object,
};
