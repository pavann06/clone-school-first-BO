import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StaffNewEditForm from '../staff-new-edit-form';

// ----------------------------------------------------------------------

export default function StaffEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['branch', 'staff', id],
    queryFn: () => request.get('branch/staff', { id }),
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'staff',
            href: paths.dashboard.staff.root,
          },
          { name: data?.info?.[0]?.full_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <StaffNewEditForm currentStaff={data?.info?.[0]} />}
    </Container>
  );
}

StaffEditView.propTypes = {
  id: PropTypes.string,
};
