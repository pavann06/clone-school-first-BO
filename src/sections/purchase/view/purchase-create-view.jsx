import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PurchaseNewEditForm from '../purchase-new-edit-form';

// ----------------------------------------------------------------------

export default function PurchaseCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Purchase"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Purchase',
            href: paths.dashboard.purchase.root,
          },
          { name: 'New Purchase' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PurchaseNewEditForm />
    </Container>
  );
}
