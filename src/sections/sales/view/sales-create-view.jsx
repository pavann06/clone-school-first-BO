import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SalesNewEditForm from '../sales-new-edit-form';

// ----------------------------------------------------------------------

export default function SalesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Sale"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Sales',
            href: paths.dashboard.sales.root,
          },
          { name: 'New Sale' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SalesNewEditForm />
    </Container>
  );
}
