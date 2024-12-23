import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ReturnsNewEditForm from '../returns-new-edit-form';

// ----------------------------------------------------------------------

export default function ReturnsEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['sales returns', 'details', id],
    queryFn: () => request.get('/sales/returns/details', { sale_return_id: id }),
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
            name: 'Sales Returns',
            href: paths.dashboard.returns.root,
          },
          { name: currentSale?.id?.toString() },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <ReturnsNewEditForm currentSale={currentSale} />}
    </Container>
  );
}

ReturnsEditView.propTypes = {
  id: PropTypes.string,
};
