import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EdutainmentNewEditForm from '../edutainment-new-edit-form';

// ----------------------------------------------------------------------

export default function EdutainmentCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Edutainment"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Edutainment',
            href: paths.dashboard.edutainment.root,
          },
          { name: 'New Edutainment' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EdutainmentNewEditForm />
    </Container>
  );
}
