import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GroupsNewEditForm from '../groups-new-edit-form';

// ----------------------------------------------------------------------

export default function GroupsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Group"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Family',
            href: paths.dashboard.groups.root,
          },
          { name: 'New Group' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <GroupsNewEditForm />
    </Container>
  );
}
