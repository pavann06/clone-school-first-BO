import Container from '@mui/material/Container';


import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeelsNewEditForm from '../feels-new-edit-form';

// ----------------------------------------------------------------------

export default function FeelsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a  Feels"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Feels',
            href: paths.dashboard.feels.root,
          },
          { name: 'New Feel' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FeelsNewEditForm />
    </Container>
  );
}
