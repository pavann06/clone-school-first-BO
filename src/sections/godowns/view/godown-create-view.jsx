import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GodownNewEditForm from '../godown-new-edit-form';

// ----------------------------------------------------------------------

export default function GodownCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Godown"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Godown',
            href: paths.dashboard.godowns.root,
          },
          { name: 'New Godown' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GodownNewEditForm />
    </Container>
  );
}
