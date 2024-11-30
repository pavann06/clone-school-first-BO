import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ReturnsNewEditForm from '../returns-new-edit-form';

// ----------------------------------------------------------------------

export default function ReturnsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="New Sales Return "
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Sales Returns',
            href: paths.dashboard.returns.root,
          },
          { name: 'New Sales Return' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ReturnsNewEditForm />
    </Container>
  );
}
