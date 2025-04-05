import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import McqNewEditForm from '../mcq-new-edit-form';

// ----------------------------------------------------------------------

export default function McqCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New MCQ"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'MCQs',
            href: paths.dashboard.mcqs.root,
          },
          { name: 'New MCQs' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <McqNewEditForm />
    </Container>
  );
}
