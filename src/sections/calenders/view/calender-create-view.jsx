import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CalenderNewEditForm from '../calender-new-edit-form';

// ----------------------------------------------------------------------

export default function CalenderCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Calender"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Calender',
            href: paths.dashboard.calender.root,
          },
          { name: 'New Calender' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CalenderNewEditForm />
    </Container>
  );
}












