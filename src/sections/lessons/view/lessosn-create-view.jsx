import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LessonsNewEditForm from '../lessons-new-edit-form';

// ----------------------------------------------------------------------

export default function LessonsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Lesson"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Lessons',
            href: paths.dashboard.lessons.root,
          },
          { name: 'New Lesson' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LessonsNewEditForm />
    </Container>
  );
}
