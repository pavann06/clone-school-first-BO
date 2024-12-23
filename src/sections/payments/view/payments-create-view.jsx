import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PaymentsNewEditForm from '../payments-new-edit-form';

// ----------------------------------------------------------------------

export default function PaymentsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Payment"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Payment',
            href: paths.dashboard.payments.root,
          },
          { name: 'New Payment' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PaymentsNewEditForm />
    </Container>
  );
}
