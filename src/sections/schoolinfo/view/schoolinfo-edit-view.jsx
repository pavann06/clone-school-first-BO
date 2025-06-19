import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SchoolInfoNewEditForm from '../schoolinfo-new-edit-form';

// ------------------------------------------------------------------------

export default function SchoolInfoEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['school', id],
    queryFn: () => request.get(`backoffice/info/${id}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Schools Info',
            href: paths.dashboard.school_info.root,
          },
          { name: data?.data?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <SchoolInfoNewEditForm currentSchool={data?.data} />}
    </Container>
  );
}

SchoolInfoEditView.propTypes = {
  id: PropTypes.string,
};
