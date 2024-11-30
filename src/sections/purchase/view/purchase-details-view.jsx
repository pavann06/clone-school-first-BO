import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PurchaseDetails from '../purchase-details';

// ----------------------------------------------------------------------

export default function PurchaseDetailsView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['purchases', 'details','receipt', id],
    queryFn: () => request.get('/purchases/details/receipt', { purchase_id: id }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const currentPurchase = data?.info;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentPurchase?.purchase_id}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Purchase',
            href: paths.dashboard.purchase.root,
          },
          { name: 'Details' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {isError && <div>Error loading data:- {error}</div>}

      {isLoading ? <LoadingScreen /> : <PurchaseDetails purchase={currentPurchase} />}
    </Container>
  );
}

PurchaseDetailsView.propTypes = {
  id: PropTypes.string,
};
