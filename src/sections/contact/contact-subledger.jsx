import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { useTable } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';

import ContactToolbar from './contact-toolbar';

export default function ContactSubLedger({ subledger, finYearStart, finYearEnd }) {
  const table = useTable();

  let totalDebit = 0;
  let totalCredit = 0;

  subledger.forEach((row) => {
    if (row.type === 'CREDIT') {
      totalCredit += parseFloat(row.final_amount);
    } else {
      totalDebit += parseFloat(row.final_amount);
    }
  });

  function getVoucherNumber(row) {
    if (row.entity === 'SALES') {
      return `SO-${row.id}`;
    }
    if (row.entity === 'SALES RETURNS') {
      return `SR-${row.id}`;
    }
    if (row.entity === 'PURCHASES') {
      return `PO-${row.id}`;
    }
    if (row.entity === 'PAYMENTS') {
      return `PY-${row.id}`;
    }
    return '';
  }

  return (
    <>
      <ContactToolbar subledger={subledger} finYearStart={finYearStart} finYearEnd={finYearEnd} />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHead>
              <TableRow>
                <TableCell width={40}>SNo</TableCell>

                <TableCell>Date</TableCell>

                <TableCell>Voucher No</TableCell>

                <TableCell>Account</TableCell>

                <TableCell>Debit</TableCell>

                <TableCell>Credit</TableCell>

                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subledger.map((row, index) => (
                <TableRow key={index}>
                  <TableCell width={40}>{index + 1}</TableCell>

                  <TableCell>{row.date ? format(new Date(row.date), 'dd-MM-yyyy') : ''}</TableCell>

                  <TableCell>{getVoucherNumber(row)}</TableCell>

                  <TableCell>{`${row.entity}-A/C`}</TableCell>

                  {row.type === 'CREDIT' ? (
                    <>
                      <TableCell>0</TableCell>
                      <TableCell>{row.final_amount}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.final_amount}</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>{row.balance}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}

              <TableCell> </TableCell>

              <TableCell> </TableCell>

              <TableCell> </TableCell>

              <TableCell> TOTAL</TableCell>

              <TableCell>{totalDebit}</TableCell>

              <TableCell>{totalCredit}</TableCell>

              <TableCell>{subledger[subledger.length - 1]?.balance}</TableCell>
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </>
  );
}

ContactSubLedger.propTypes = {
  subledger: PropTypes.array,
  finYearStart: PropTypes.string,
  finYearEnd: PropTypes.string,
};
