import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import HostNewEditForm from '../host-new-edit-form';

// ----------------------------------------------------------------------

export default function HostCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Host"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Host',
            href: paths.dashboard.host.root,
          },
          { name: 'New Host' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <HostNewEditForm />
    </Container>
  );
}
