import sum from 'lodash/sum';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';

import SalesToolbar from './sales-toolbar';
// ----------------------------------------------------------------------

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td': {
    textAlign: 'right',
    borderBottom: 'none',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

export default function SalesDetails({ sales }) {
  const totalOnRow = sales.items.map((item) => parseFloat(item.total));

  const subTotal = sum(totalOnRow);
  const round_off = Math.round(subTotal) - subTotal;
  console.log(sales);

  const renderTotal = (
    <>
      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>
          <Box sx={{ mt: 2 }} />
          Subtotal
        </TableCell>
        <TableCell width={120} sx={{ typography: 'subtitle2' }}>
          <Box sx={{ mt: 2 }} />
          {fCurrency(subTotal)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>Round Off</TableCell>
        <TableCell width={120}> {round_off ? fCurrency(round_off) : 0}</TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>Freight Charges</TableCell>
        <TableCell width={120}> {fCurrency(sales.freight_charges)}</TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>Taxes</TableCell>
        <TableCell width={120}>0</TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ typography: 'subtitle1' }}>Total</TableCell>
        <TableCell width={140} sx={{ typography: 'subtitle1' }}>
          {fCurrency(sales.final_amount)}
        </TableCell>
      </StyledTableRow>
    </>
  );

  const renderFooter = (
    <Grid container>
      <Grid xs={12} md={9} sx={{ py: 3 }}>
        <Typography variant="subtitle2">NOTES</Typography>

        <Typography variant="body2">We appreciate your business!</Typography>
      </Grid>

      <Grid xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
        <Typography variant="subtitle2">Have a Question?</Typography>

        <Typography variant="body2">contact@FamiliFirst.com</Typography>
      </Grid>
    </Grid>
  );

  const renderList = (
    <TableContainer sx={{ overflow: 'unset', mt: 5 }}>
      <Scrollbar>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell width={40}>#</TableCell>

              <TableCell sx={{ typography: 'subtitle2' }}>Product</TableCell>

              <TableCell>Bags</TableCell>

              <TableCell>Net Weight</TableCell>

              <TableCell align="right">Price</TableCell>

              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sales.items.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography variant="subtitle2">{row.product_name}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{row.bags}</TableCell>

                <TableCell>{row.net_weight}</TableCell>

                <TableCell align="right">{fCurrency(row.price)}</TableCell>

                <TableCell align="right">{fCurrency(row.total)}</TableCell>
              </TableRow>
            ))}

            {renderTotal}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );

  return (
    <>
      <SalesToolbar sales={sales} />
      <Card sx={{ pt: 5, px: 5 }}>
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <Box component="img" alt="logo" src={sales.client.logo} sx={{ width: 48, height: 48 }} />

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Label
              variant="soft"
              color={
                (sales.status === 'INVOICE' && 'success') ||
                (sales.status === 'DELIVERY-CHALLAN' && 'warning') ||
                (sales.status === 'REJECTED' && 'error') ||
                'default'
              }
            >
              {sales.status}
            </Label>
            <Typography variant="h6">
              {(sales.status === 'INVOICE' && `INV-${sales.order_no}`) ||
                (sales.status === 'DELIVERY-CHALLAN' && `DC-${sales.order_no}`) ||
                (sales.status === 'REJECTED' && '')}
            </Typography>
            {fDate(sales.order_date)}
          </Stack>
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Customer
            </Typography>
            {sales.customer.full_name}
            <br />
            {sales.customer.address1}
            <br />
            Phone: {sales.customer.mobile}
            <br />
          </Stack>

          {sales.distributor ? (
            <Stack sx={{ typography: 'body2' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Distributor
              </Typography>
              {sales.distributor.full_name}
              <br />
              {sales.distributor.address1}
              <br />
              Phone: {sales.distributor.mobile}
              <br />
            </Stack>
          ) : (
            <Stack sx={{ typography: 'body2' }} />
          )}

          <Stack sx={{ typography: 'body2' }}>
            {/* <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Date
            </Typography>
            {fDate(sales.order_date)} */}
          </Stack>
        </Box>

        {renderList}

        <Divider sx={{ mt: 5, borderStyle: 'dashed' }} />

        {renderFooter}
      </Card>
    </>
  );
}

SalesDetails.propTypes = {
  sales: PropTypes.object,
};
