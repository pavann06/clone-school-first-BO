import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GallaryNewEditForm from '../gallary-edit-form';

// ------------------------------------------------------------------------

export default function GallaryEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['gallary', id],
    queryFn: () => request.get(`backoffice/get/gallery?id=${id}`), 
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Gallary',
            href: paths.dashboard.gallary.root,
          },
          { name: data?.data?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <GallaryNewEditForm currentEdutainment={data?.data} />}
    </Container>
  );
}

GallaryEditView.propTypes = {
  id: PropTypes.string,
};
