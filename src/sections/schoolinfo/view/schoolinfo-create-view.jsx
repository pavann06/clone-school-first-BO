import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SchoolInfoNewEditForm from '../schoolinfo-new-edit-form';

// ----------------------------------------------------------------------

export default function SchoolInfoCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New School Info"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'School',
            href: paths.dashboard.school_info.root,
          },
          { name: 'New school' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SchoolInfoNewEditForm />
    </Container>
  );
}
