import PropTypes from 'prop-types';

import { TableRow, MenuItem, TableCell, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function WordTableRow({ row, onEditRow, onDeleteRow }) {
  const { serial_no, word, definition, parts_of_speech, usage, origin, points, status } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>{word}</TableCell>

        {/* Description */}
        <TableCell>{definition}</TableCell>
        <TableCell>{parts_of_speech}</TableCell>

        {/* Interactions */}
        <TableCell>{usage}</TableCell>

        {/* Language */}
        <TableCell>{origin}</TableCell>

        <TableCell>{points}</TableCell>

        {/* Status */}
        <TableCell>{status}</TableCell>

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

WordTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
