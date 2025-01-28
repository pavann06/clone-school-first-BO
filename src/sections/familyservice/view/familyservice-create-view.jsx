import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FamilyServiceNewEditForm from '../familyservice-new-edit-form';

// ----------------------------------------------------------------------

export default function FamilyServiceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Family Member"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Family',
            href: paths.dashboard.banner.root,
          },
          { name: 'New Family' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FamilyServiceNewEditForm />
    </Container>
  );
}
