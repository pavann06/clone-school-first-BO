import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OnlineStoresNewEditForm from '../onlinestores-new-edit-form';

// ----------------------------------------------------------------------

export default function OnlieStoresCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Online Stores"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Online Stores',
            href: paths.dashboard.onlinestores.root,
          },
          { name: 'New Online Stores' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OnlineStoresNewEditForm />
    </Container>
  );
}












