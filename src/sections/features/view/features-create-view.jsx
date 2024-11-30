import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeaturesNewEditForm from '../features-new-edit-form';

// ----------------------------------------------------------------------

export default function FeaturesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Feature"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Features',
            href: paths.dashboard.features.root,
          },
          { name: 'New Feature' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FeaturesNewEditForm />
    </Container>
  );
}
