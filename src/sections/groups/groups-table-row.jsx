import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  Link,
  TableRow,
  Box,
  MenuItem,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function GroupsTableRow({ row, onEditRow, onDeleteRow, onViewRow }) {
  const {
    serial_no,
    name,
    logo,

    profile_image,
    subscribers,
    admins,
    posts,

    status,
  } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>{name}</TableCell>
        {/* Image */}
        <TableCell align="center">
          {profile_image ? (
            <img
              src={profile_image}
              alt={`Thumbnail for ${name}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>

        {/* Image */}
        <TableCell align="center">
          {logo ? (
            <img
              src={logo}
              alt={`Thumbnail for ${name}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No logo'
          )}
        </TableCell>

        {/* Interactions */}
        <TableCell>{subscribers}</TableCell>

        {/* Language */}
        <TableCell>{posts}</TableCell>

        {/* Status */}
        <TableCell>{status}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Custom Popover */}
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
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="carbon:view" />
          {/* <AppointmentListPage /> */}
          Feeds
        </MenuItem>
      </CustomPopover>
    </>
  );
}

GroupsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
