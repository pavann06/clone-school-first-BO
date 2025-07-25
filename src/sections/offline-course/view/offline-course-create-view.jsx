import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OfflineCourseNewEditForm from '../offline-course-new-edit-form';

// ----------------------------------------------------------------------

export default function OfflineCourseCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Course"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Offline Course',
            href: paths.dashboard.offlinecourse.root,
          },
          { name: 'New Course' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OfflineCourseNewEditForm />
    </Container>
  );
}
