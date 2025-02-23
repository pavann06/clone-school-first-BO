import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveysNewEditForm from '../surveys-new-edit-form';

// ----------------------------------------------------------------------

export default function SurveysCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Survey"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Surveys',
            href: paths.dashboard.banner.root,
          },
          { name: 'New Banner' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SurveysNewEditForm />
    </Container>
  );
}
