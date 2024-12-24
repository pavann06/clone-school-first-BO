import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PaymentsNewEditForm from '../payments-new-edit-form';

// ----------------------------------------------------------------------

export default function PaymentsEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['payments', id],
    queryFn: () => request.get('/payments', { payment_id: id }),
    staleTime: 2 * 60 * 60 * 1000,
  });
  const currentPayment = isLoading ? null : data?.info?.[0];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Payments',
            href: paths.dashboard.payments.root,
          },
          { name: currentPayment?.id?.toString() },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <PaymentsNewEditForm currentPayment={currentPayment} />}
    </Container>
  );
}

PaymentsEditView.propTypes = {
  id: PropTypes.string,
};
