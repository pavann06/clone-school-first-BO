import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CitiesNewEditForm from '../cities-new-edit-form';

// ----------------------------------------------------------------------

export default function CitiesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new City"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Cities',
            href: paths.dashboard.cities.root,
          },
          { name: 'New City' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CitiesNewEditForm />
    </Container>
  );
}
