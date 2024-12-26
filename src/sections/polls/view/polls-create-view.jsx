import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PollsNewEditForm from '../polls-new-edit-form';

// ----------------------------------------------------------------------

export default function PollsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Poll"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Polls',
            href: paths.dashboard.polls.root,
          },
          { name: 'New Poll' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PollsNewEditForm />
    </Container>
  );
}
