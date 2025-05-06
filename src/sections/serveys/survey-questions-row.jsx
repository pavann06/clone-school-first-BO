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
    question_type,

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
  {Array.isArray(options) && options.length > 0 ? (
    <div style={{ whiteSpace: 'pre-line' }}>
      {options.map((value, idx) => (
        <div key={`option-${idx}`}>
          {idx + 1}: {value}
        </div>
      ))}
    </div>
  ) : (
    'No options available'
  )}
</TableCell>






        <TableCell>{question_type}</TableCell>

        {/* Interactions */}
       

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
