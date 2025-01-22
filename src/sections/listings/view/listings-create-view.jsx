import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ListingsNewEditForm from '../listings-new-edit-form';

// ----------------------------------------------------------------------

export default function ListingsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Listing"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Edutainment',
            href: paths.dashboard.listings.root,
          },
          { name: 'New Listing' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ListingsNewEditForm />
    </Container>
  );
}
