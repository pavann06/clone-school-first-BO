import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function BranchTableRow({ row, onEditRow }) {
  const { branch_name, mobile, address, email, serial_no } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={branch_name} sx={{ mr: 2 }}>
            {branch_name.charAt(0).toUpperCase()}
          </Avatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {branch_name}
              </Typography>
            }
          />
        </TableCell>

        <TableCell>{mobile}</TableCell>

        <TableCell>{email}</TableCell>

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

BranchTableRow.propTypes = {
  onEditRow: PropTypes.func,
  row: PropTypes.object,
};
