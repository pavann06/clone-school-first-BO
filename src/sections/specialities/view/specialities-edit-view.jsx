import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SpecialitiesNewEditForm from '../specialities-new-edit-form';

// ----------------------------------------------------------------------

export default function SpecialitiesEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['specialities', id],
    queryFn: () => request.get('/specialities', { id }),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Specialities',
            href: paths.dashboard.specialities.root,
          },
          { name: data?.info?.[0]?.speciality_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <SpecialitiesNewEditForm currentSpeciality={data?.info?.[0]} />
      )}
    </Container>
  );
}

SpecialitiesEditView.propTypes = {
  id: PropTypes.string,
};
