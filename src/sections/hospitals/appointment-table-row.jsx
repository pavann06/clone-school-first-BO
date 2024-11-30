import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function AppointmentsTableRow({ row, onEditRow, onDeleteRow, onViewRow }) {
  const { serial_no, doctor_name,  mobile, full_name, booking_id , fee , status} = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>
        <TableCell>{booking_id}</TableCell>
        <TableCell>{doctor_name}</TableCell>

        {/* <TableCell>{hospital}</TableCell> */}

        <TableCell>{full_name}</TableCell>
        <TableCell>{mobile}</TableCell>
        <TableCell>{fee}</TableCell>
        <TableCell>{status}</TableCell>

        {/* <TableCell>
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      > */}
        {/* <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        > */}
          {/* <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDeleteRow();
            popover.onClose();
          }}
        > */}
          {/* <Iconify icon="material-symbols:delete" />
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        > */}
          {/* <Iconify icon="carbon:view" />
          {/* <AppointmentListPage /> */}
          {/* View
        </MenuItem>
      </CustomPopover> */} 
    </>
  );
}

AppointmentsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
