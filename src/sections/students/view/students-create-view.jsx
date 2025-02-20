import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StudentsNewEditForm from '../students-new-edit-form';

// ----------------------------------------------------------------------

export default function StudentsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Student"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Edutainment',
            href: paths.dashboard.banner.root,
          },
          { name: 'New Banner' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <StudentsNewEditForm />
    </Container>
  );
}
