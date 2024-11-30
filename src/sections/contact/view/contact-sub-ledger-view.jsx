import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContactSubLedger from '../contact-subledger';

// ----------------------------------------------------------------------

export default function ContactSubLedgerView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['contacts', 'subledger', id],
    queryFn: () => request.get('/contacts/subledger', { contact_id: id }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return format(new Date(dateString), 'dd-mm-yyyy');
  }

  const currentSubLedger = data?.info;
  const finYearStart = formatDate(data?.start_date);
  const finYearEnd = formatDate(data?.end_date);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentSubLedger?.contact_id}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Contact',
            href: paths.dashboard.contact.root,
          },
          { name: 'Sub Ledger' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {isError && <div>Error loading data:- {error}</div>}

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ContactSubLedger
          subledger={currentSubLedger}
          finYearStart={finYearStart}
          finYearEnd={finYearEnd}
        />
      )}
    </Container>
  );
}

ContactSubLedgerView.propTypes = {
  id: PropTypes.string,
};
