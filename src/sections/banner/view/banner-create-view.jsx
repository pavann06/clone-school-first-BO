import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerNewEditForm from '../banner-new-edit-form';

// ----------------------------------------------------------------------

export default function BannerCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Banner"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Edutainment',
            href: paths.dashboard.banner.root,
          },
          { name: 'New Edutainment' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BannerNewEditForm />
    </Container>
  );
}
