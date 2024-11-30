import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function GodownTableRow({ row, onEditRow }) {
  const { godown_name, mobile, address, serial_no } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>

        <TableCell>{godown_name}</TableCell>

        <TableCell>{mobile}</TableCell>

        <TableCell>{address}</TableCell>

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
       
      </CustomPopover>
    </>
  );
}

GodownTableRow.propTypes = {
  onEditRow: PropTypes.func,
  row: PropTypes.object,
};
