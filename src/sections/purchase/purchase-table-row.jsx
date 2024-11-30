import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function PurchseTableRow({ row, selected, onViewRow, onEditRow }) {
  const { supplier_name, organizer_name, order_date, final_amount, order_no, serial_no, status } =
    row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{serial_no}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={supplier_name} sx={{ mr: 2 }}>
            {supplier_name.charAt(0).toUpperCase()}
          </Avatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {supplier_name}
              </Typography>
            }
            secondary={
              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {`RCPT-${order_no}`}
              </Link>
            }
          />
        </TableCell>

        <TableCell>{organizer_name}</TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(order_date), 'dd MMM yyyy')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>{fCurrency(final_amount)}</TableCell>

        <TableCell>
          <Label variant="soft" color="success">
            {status}
          </Label>
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
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

PurchseTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
