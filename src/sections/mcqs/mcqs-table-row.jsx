import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  Link,
  TableRow,
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

export default function McqsTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    question,
    description , 
    question_number,
    question_marks,
    options,
    correct_answer, 

  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);



  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>{question}</TableCell>

        {/* Description */}
        <TableCell>
        {description}
        </TableCell>

        {/* Approved Info */}
        <TableCell>
      {question_number}
        </TableCell>

        {/* Image */}
        <TableCell>
          {question_marks}
         
        </TableCell>

        <TableCell>
  {options && typeof options === 'object' ? (
    <ol>
      {Object.values(options).map((value, index) => (
        <li key={index}>{value}</li>
      ))}
    </ol>
  ) : (
    <em>No options</em> // optional fallback
  )}
</TableCell>


        {/* Language */}
        <TableCell>{correct_answer}</TableCell>

        {/* Status */}
      
        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

     
          {/* Description */}
        

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
      </CustomPopover>
    </>
  );
}

McqsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
