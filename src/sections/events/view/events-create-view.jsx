import Container from '@mui/material/Container';


import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EventsNewEditForm from '../events-new-edit-form';

// ----------------------------------------------------------------------

export default function EventsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a  Event"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Events',
            href: paths.dashboard.events.root,
          },
          { name: 'New Banner' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EventsNewEditForm />
    </Container>
  );
}
