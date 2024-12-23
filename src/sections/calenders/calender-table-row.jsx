

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Skeleton, IconButton, MenuItem } from '@mui/material';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useRouter } from 'src/routes/hooks';

function CalenderTableRow({ row, onEditRow, onDeleteRow, isLoading ,serialNumber }) {

  
  const popover = usePopover();
  const router = useRouter();

  const handleViewRow = useCallback(
    (id) => {
      router.push(`/dashboard/calender/view/${id}`);
    },
    [router]
  );





  return (
    <>
      <TableRow hover>

        <TableCell>{serialNumber}</TableCell>
    
        <TableCell align="center" onClick={() => handleViewRow(row.id)} style={{ cursor: 'pointer' }}>
          {row.prompt || 'No Prompt'}
        </TableCell>
        <TableCell align="center">{row.benefit || 'No Benefit'}</TableCell>
        <TableCell align="center">{row.description || 'No Description'}</TableCell>
        <TableCell align="center">
          {row.youtube_video_url ? (
            <Link href={row.youtube_video_url} target="_blank" rel="noopener noreferrer">
              {row.youtube_video_url}
            </Link>
          ) : (
            'No URL'
          )}
        </TableCell>
        <TableCell align="center">
          {row.date ? new Date(row.date).toLocaleDateString('en-GB') : 'N/A'}
        </TableCell>
        <TableCell align="center">
          {row.image ? (
            <img
              src={row.image}
              alt={`Thumbnail for ${row.prompt}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>
        <TableCell>
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

CalenderTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prompt: PropTypes.string,
    benefit: PropTypes.string,
    description: PropTypes.string,
    youtube_video_url: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
  }),
  serialNumber: PropTypes.number, // Add this line
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  isLoading: PropTypes.bool,
};

CalenderTableRow.defaultProps = {
  row: { id: null },
  serialNumber: null, // Add a default value if necessary
  onEditRow: () => {},
  onDeleteRow: () => {},
  isLoading: false,
};


export default CalenderTableRow;
