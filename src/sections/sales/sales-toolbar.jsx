import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import request from 'src/api/request';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import DcPDF from './DC-pdf';

// ----------------------------------------------------------------------

export default function SalesToolbar({ sales }) {
  const router = useRouter();

  const view = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const handleEdit = useCallback(() => {
    router.push(paths.dashboard.sales.edit(sales.id));
  }, [sales.id, router]);

  const generateInvoice = async () => {
    const response = await request.put('sales/details/invoice', { sale_id: sales.id });
    const { success } = response;
    if (success) {
      enqueueSnackbar('Invoice generated Successfully');

      queryClient.invalidateQueries(['contacts']);

      router.push(paths.dashboard.sales.root);
      return null;
    }
    return enqueueSnackbar('Error occured in generating Invoice');
  };

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Stack direction="row" spacing={1} flexGrow={1} sx={{ width: 1 }}>
          {sales.status !== 'INVOICE' && (
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="View">
            <IconButton onClick={view.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={<DcPDF sales={sales} />}
            fileName={`INV-${sales.order_no}-${sales.customer.full_name}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon="eva:cloud-download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>

        {sales.status !== 'INVOICE' && (
          <LoadingButton
            variant="outlined"
            color="primary"
            onClick={generateInvoice}
            sx={{ width: { md: 200 } }}
          >
            Generate Invoice
          </LoadingButton>
        )}
      </Stack>

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Close
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <DcPDF sales={sales} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

SalesToolbar.propTypes = {
  sales: PropTypes.object,
};
