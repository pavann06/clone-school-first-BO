import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function StaffTableRow({ row, onEditRow }) {
  const { full_name, mobile, email, role, is_active, serial_no } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={full_name} sx={{ mr: 2 }}>
            {full_name.charAt(0).toUpperCase()}
          </Avatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {full_name}
              </Typography>
            }
          />
        </TableCell>

        <TableCell>{mobile}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell>
          <Label color={is_active ? 'success' : 'error'}>{is_active ? 'True' : 'False'}</Label>
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
      </CustomPopover>
    </>
  );
}

StaffTableRow.propTypes = {
  onEditRow: PropTypes.func,
  row: PropTypes.object,
};
