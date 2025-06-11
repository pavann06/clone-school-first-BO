import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GradeNewEditForm from '../grade-new-edit-form';

// ------------------------------------------------------------------------

export default function GradeEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', id],
    queryFn: () => request.get(`backoffice/grade/${id}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Grade',
            href: paths.dashboard.grade.root,
          },
          { name: data?.data?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <GradeNewEditForm currentEdutainment={data?.data} />}
    </Container>
  );
}

GradeEditView.propTypes = {
  id: PropTypes.string,
};
