import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveysNewEditForm from '../surveys-new-edit-form';

// ------------------------------------------------------------------------

export default function SurveysEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', id],
    queryFn: () => request.get(`backoffice/backoffice/survey/${id}`),
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
          { name: data?.data?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <SurveysNewEditForm currentSurvey={data?.data} />}
    </Container>
  );
}

SurveysEditView.propTypes = {
  id: PropTypes.string,
};
