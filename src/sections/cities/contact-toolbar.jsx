import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import { useBoolean } from 'src/hooks/use-boolean';

import request from 'src/api/request';

import Iconify from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';

import ContactPDF from './contact-pdf';

// ----------------------------------------------------------------------

export default function ContactToolbar({ subledger, finYearStart, finYearEnd }) {
  const view = useBoolean();

  const {
    data: contactsData,
    isLoading: contactsLoading,
    isError: contactsError,
    error: contactsErrorDetails,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => request.get('/contacts', { id: subledger?.[0]?.contact }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErrorDetails,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => request.get('/profile'),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const Contact = contactsData?.info?.[0];
  const Client = profileData?.info;

  if (contactsError || profileError) {
    return <div>Error: {contactsErrorDetails || profileErrorDetails}</div>;
  }

  if (contactsLoading || profileLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Stack direction="row" spacing={1} flexGrow={1} sx={{ width: 1 }}>
          <Tooltip title="View">
            <IconButton onClick={view.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={
              contactsLoading || profileLoading ? (
                <LoadingScreen />
              ) : (
                <ContactPDF
                  subledger={subledger}
                  Contact={Contact}
                  Client={Client}
                  finYearStart={finYearStart}
                  finYearEnd={finYearEnd}
                />
              )
            }
            fileName={`${Contact?.full_name}.pdf`}
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
              {contactsLoading || profileLoading ? (
                <LoadingScreen />
              ) : (
                <ContactPDF
                  subledger={subledger}
                  finYearStart={finYearStart}
                  finYearEnd={finYearEnd}
                  Contact={Contact}
                  Client={Client}
                />
              )}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
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
          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Consignee
            </Typography>
            {Contact?.full_name}
            <br />
            {Contact?.address1}
            <br />
            {Contact?.state}
            <br />
            {Contact?.mobile}
            <br />
            GSTIN-{Contact?.gst_number}
            <br />
          </Stack>
        </Box>
      </Card>
    </>
  );
}

ContactToolbar.propTypes = {
  subledger: PropTypes.array,
  finYearStart: PropTypes.string,
  finYearEnd: PropTypes.string,
};
