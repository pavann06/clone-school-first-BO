import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GradesNewEditForm from '../grades-new-edit-form';

// ------------------------------------------------------------------------

export default function GradesEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['grade', id],
    queryFn: () => request.get(`backoffice/grade/${id}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Banners',
            href: paths.dashboard.grades.root,
          },
          { name: data?.info?.[0]?.Banner_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <GradesNewEditForm currentBanner={data?.info?.[0]} />}
    </Container>
  );
}

GradesEditView.propTypes = {
  id: PropTypes.string,
};
