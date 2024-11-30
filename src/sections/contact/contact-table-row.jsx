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

export default function ContactTableRow({ row, onEditRow, subledger }) {
  const { full_name, mobile, address1, role, serial_no } = row;

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

        <TableCell>{address1}</TableCell>

        <TableCell>{`${role?.[0]}${role?.[1] ? `, ${role[1]}` : ''}`}</TableCell>

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
            subledger();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Sub Ledger
        </MenuItem>
      </CustomPopover>
    </>
  );
}

ContactTableRow.propTypes = {
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  subledger: PropTypes.func,
};
