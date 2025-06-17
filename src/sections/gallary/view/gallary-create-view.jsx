import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GallaryNewEditForm from '../gallary-edit-form';

// ----------------------------------------------------------------------

export default function GallaryCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Gallary"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Gallary',
            href: paths.dashboard.gallary.root,
          },
          { name: 'New gallary' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GallaryNewEditForm />
    </Container>
  );
}
