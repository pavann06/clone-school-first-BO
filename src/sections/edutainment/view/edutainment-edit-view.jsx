import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EdutainmentNewEditForm from '../edutainment-new-edit-form';

// ------------------------------------------------------------------------

export default function EdutainmentEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', id],
    queryFn: () => request.get('backoffice/edutain/feeds', { id }),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Edutainment',
            href: paths.dashboard.edutainment.root,
          },
          { name: data?.info?.[0]?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <EdutainmentNewEditForm currentEdutainment={data?.info?.[0]} />}
    </Container>
  );
}



EdutainmentEditView.propTypes = {
  id: PropTypes.string,
};