import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ProductTableRow({ row, onEditRow, onViewRow }) {
  const { product_name, images, inventoryType, serial_no } = row;
  const in_stock = Number(row.in_stock);

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={product_name}
            src={images?.[0]}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />

          <ListItemText
            disableTypography
            primary={
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {product_name}
              </Link>
            }
          />
        </TableCell>

        <TableCell sx={{ typography: 'caption', color: 'text.secondary' }}>
          <LinearProgress
            value={in_stock}
            variant="determinate"
            color={
              (inventoryType === 'out of stock' && 'error') ||
              (inventoryType === 'low stock' && 'warning') ||
              'success'
            }
            sx={{ mb: 1, height: 6, maxWidth: 80 }}
          />
          {!!in_stock && in_stock} {inventoryType}
        </TableCell>

        <TableCell>
          <Label variant="soft" color="success">
            CREATED
          </Label>
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
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

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

ProductTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
