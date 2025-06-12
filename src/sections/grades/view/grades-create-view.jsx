import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GradesNewEditForm from '../grades-new-edit-form';

// ----------------------------------------------------------------------

export default function GradesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Grade"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Grades',
            href: paths.dashboard.grades.root,
          },
          { name: 'New Grade' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GradesNewEditForm />
    </Container>
  );
}
