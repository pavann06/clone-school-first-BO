import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WebinarNewEditForm from '../webinar-new-edit-form';

// ----------------------------------------------------------------------

export default function WebinarCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Webinar"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Webinar',
            href: paths.dashboard.webinar.root,
          },
          { name: 'New Webinar' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WebinarNewEditForm />
    </Container>
  );
}
