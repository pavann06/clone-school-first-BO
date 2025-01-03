import PropTypes from 'prop-types';

import { TableRow, TableCell } from '@mui/material';

export default function SubscribedusersTableRow({ row }) {
  const { serial_no, mobile, created_at } = row;

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>{mobile}</TableCell>

        {/* Description */}
        <TableCell>
          <div>
            {' '}
            {new Date(created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
          </div>
          <div>
            {' '}
            {new Date(created_at).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
        </TableCell>
      </TableRow>

      {/* Custom Popover */}
      {/* <CustomPopover
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
      </CustomPopover> */}
    </>
  );
}

SubscribedusersTableRow.propTypes = {
  row: PropTypes.object,
};
