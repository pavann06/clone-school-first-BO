import PropTypes from 'prop-types';
import {useQuery} from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SalesNewEditForm from '../sales-new-edit-form';

// ----------------------------------------------------------------------

export default function SalesEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['sales','details' ,id],
    queryFn: () => request.get('/sales/details', { sale_id:id }),
    staleTime: 24 * 60 * 60 * 1000,
  });
  const currentSale = isLoading ? null : data?.info;

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
            name: 'Sales',
            href: paths.dashboard.sales.root,
          },
          { name: currentSale?.id?.toString() },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        isLoading ? <LoadingScreen/> : <SalesNewEditForm currentSale={currentSale} />
      }
    </Container>
  );
}

SalesEditView.propTypes = {
  id: PropTypes.string,
};
