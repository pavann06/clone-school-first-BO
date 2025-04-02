import { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, IconButton, MenuItem, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function BannerTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    banner_image,
    module,
    is_active,
    action_type,
  } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* Serial No */}
        <TableCell>{serial_no}</TableCell>

        {/* Banner Image */}
        <TableCell >
          {banner_image ? (
            <img
              src={banner_image}
              alt={`Thumbnail for ${banner_image}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>

        {/* Module */}
        <TableCell>{module}</TableCell>

        {/* Active Status */}
        <TableCell>{is_active ? 'Active' : 'Inactive'}</TableCell>

        {/* Action Type */}
        <TableCell>{action_type}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Custom Popover for Actions */}
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

BannerTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object.isRequired,
};
