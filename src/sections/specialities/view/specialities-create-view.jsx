import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SpecialitiesNewEditForm from '../specialities-new-edit-form';

// ----------------------------------------------------------------------

export default function SpecialitiesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Speciality"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Speciality',
            href: paths.dashboard.specialities.root,
          },
          { name: 'New Speciality' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SpecialitiesNewEditForm />
    </Container>
  );
}
