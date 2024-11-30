import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SalesDetails from '../sales-details';

// ----------------------------------------------------------------------

export default function SalesDetailsView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['sales', 'details','invoice', id],
    queryFn: () => request.get('/sales/details/invoice', { sale_id: id }),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const currentSales = data?.info;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentSales?.sale_id}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Sales',
            href: paths.dashboard.sales.root,
          },
          { name: 'Details' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {isError && <div>Error loading data:- {error}</div>}

      {isLoading ? <LoadingScreen /> : <SalesDetails sales={currentSales} />}
    </Container>
  );
}

SalesDetailsView.propTypes = {
  id: PropTypes.string,
};
