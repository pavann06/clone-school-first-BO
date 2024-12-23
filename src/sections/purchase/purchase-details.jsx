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

import Scrollbar from 'src/components/scrollbar';

import PurchaseToolbar from './purchase-toolbar';

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

export default function PurchaseDetails({ purchase }) {
  const totalOnRow = purchase.items.map((item) => parseFloat(item.total));

  const subTotal = sum(totalOnRow);
  const round_off = Math.round(subTotal) - subTotal;

  const renderTotal = (
    <>
      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>
          <Box sx={{ mt: 2 }} />
          Sub Total
        </TableCell>
        <TableCell width={120} sx={{ typography: 'subtitle2' }}>
          <Box sx={{ mt: 2 }} /> {fCurrency(subTotal)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell colSpan={4} />
        <TableCell sx={{ color: 'text.secondary' }}>Round Off</TableCell>
        <TableCell width={120}> {round_off ? fCurrency(round_off) : 0}</TableCell>
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
          {fCurrency(purchase.final_amount)}
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
            {purchase.items.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography variant="subtitle2">{row.product_name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.bags}</TableCell>
                <TableCell>{row.net_weight} KG</TableCell>
                <TableCell align="right"> {fCurrency(row.price)}</TableCell>
                <TableCell align="right"> {fCurrency(row.total)}</TableCell>
              </TableRow>
            ))}

            {renderTotal}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
  console.log(purchase.organizer.id);

  return (
    <>
      <PurchaseToolbar purchase={purchase} />
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
          <Box
            component="img"
            alt="logo"
            src={purchase.client.logo}
            sx={{ width: 48, height: 48 }}
          />

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Typography variant="h6">{`RCPT-${purchase.order_no}`}</Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {fDate(purchase.order_date)}
            </Typography>
          </Stack>
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Supplier
            </Typography>
            {purchase.supplier.full_name}
            <br />
            {purchase.supplier.address1}
            <br />
            Phone: {purchase.supplier.mobile}
            <br />
          </Stack>

          {purchase.organizer ? (
            <Stack sx={{ typography: 'body2' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Organizer
              </Typography>
              {purchase?.organizer?.full_name}
              <br />
              {purchase?.organizer?.address1}
              <br />
              Phone: {purchase?.organizer?.mobile}
              <br />
            </Stack>
          ) : (
            <Stack sx={{ typography: 'body2' }} />
          )}
        </Box>

        {renderList}

        <Divider sx={{ mt: 5, borderStyle: 'dashed' }} />

        {renderFooter}
      </Card>
    </>
  );
}

PurchaseDetails.propTypes = {
  purchase: PropTypes.object,
};
