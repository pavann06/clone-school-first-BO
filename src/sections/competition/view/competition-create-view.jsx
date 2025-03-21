import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CompetitionNewEditForm from '../competition-new-edit-form';

// ----------------------------------------------------------------------

export default function CompetitionCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Competition"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Competition',
            href: paths.dashboard.competition.root,
          },
          { name: 'New Competiton' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CompetitionNewEditForm />
    </Container>
  );
}
