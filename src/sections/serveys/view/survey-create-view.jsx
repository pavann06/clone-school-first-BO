import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveyNewEditForm from '../survey-new-edit-form';

// ----------------------------------------------------------------------

export default function SurveyCreateView() {
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
            name: 'Servey',
            href: paths.dashboard.survey.root,
          },
          { name: 'New Servey' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SurveyNewEditForm />
    </Container>
  );
}
