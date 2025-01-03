import PropTypes from 'prop-types';

import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function ServeyQuestionsTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    question,
    options,
    answer,

    description,
  } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {question}
              </Link>
            }
          />
        </TableCell>

        {/* Description */}
        <TableCell>
          {options && typeof options === 'object' ? (
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              {Object.entries(options).map(([key, value], idx) => (
                <li key={`option-${key}-${idx}`}>
                  {key.toUpperCase()}: {typeof value === 'object' ? JSON.stringify(value) : value}
                </li>
              ))}
            </ul>
          ) : (
            'No options available'
          )}
        </TableCell>

        <TableCell>{answer}</TableCell>

        {/* Interactions */}
        <TableCell>{description}</TableCell>

        {/* Actions */}
        <TableCell align="center">
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

ServeyQuestionsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  // onViewRow: PropTypes.func,
  row: PropTypes.object,
};
