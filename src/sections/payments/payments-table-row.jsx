import { format } from 'date-fns';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PaymentsTableRow({ row, selected }) {
  const { contact_name, payment_date, amount, payment_type,serial_no,remarks } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell>{serial_no}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{contact_name}</TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(payment_date), 'dd MMM yyyy')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell> {amount} </TableCell>

      <TableCell> {payment_type} </TableCell>

      <TableCell>{remarks}</TableCell>

      <TableCell  sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color="default">
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

PaymentsTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};
