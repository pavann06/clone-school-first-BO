import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import HospitalsNewEditForm from '../hospitals-new-edit-form';

// ----------------------------------------------------------------------

export default function HospitalsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Hospital"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Hospitals',
            href: paths.dashboard.hospitals.root,
          },
          { name: 'New Hospital' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <HospitalsNewEditForm />
    </Container>
  );
}
