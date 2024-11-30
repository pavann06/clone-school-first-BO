import PropTypes from 'prop-types';
import {useQuery} from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PurchaseNewEditForm from '../purchase-new-edit-form';

// ----------------------------------------------------------------------

export default function PurchaseEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['purchases','details' ,id],
    queryFn: () => request.get('/purchases/details', { purchase_id:id }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  const currentPurchase = isLoading ? null : data?.info;

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
            name: 'Purchase',
            href: paths.dashboard.purchase.root,
          },
          { name: currentPurchase?.id?.toString() },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentPurchase ? <PurchaseNewEditForm currentPurchase={currentPurchase} /> : <LoadingScreen/>
      }
    </Container>
  );
}

PurchaseEditView.propTypes = {
  id: PropTypes.string,
};
