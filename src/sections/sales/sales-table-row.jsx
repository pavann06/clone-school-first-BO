import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
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

export default function SalesTableRow({ row, selected, onViewRow, onEditRow }) {
  const { customer_name, distributor_name, order_date, final_amount, order_no, status, serial_no } = row;


  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{serial_no}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
      
          <Avatar alt={customer_name} sx={{ mr: 2 }}>
            {customer_name.charAt(0).toUpperCase()}
          </Avatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {customer_name}
              </Typography>
            }
            secondary={
              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {`INV-${order_no}`}
              </Link>
            }
          />
        </TableCell>

        <TableCell>{distributor_name}</TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(order_date), 'dd mm yyyy')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          />
        </TableCell>

        <TableCell>{fCurrency(final_amount)}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'INVOICE' && 'success') ||
              (status === 'DELIVERY-CHALLAN' && 'warning') ||
              (status === 'REJECTED' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell  sx={{ px: 1 }}>
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
        
        {status !== 'INVOICE' && (
          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        )}
      </CustomPopover>
    </>
  );
}

SalesTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
