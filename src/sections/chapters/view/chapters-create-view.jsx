import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ChaptersNewEditForm from '../chapters-new-edit-form';

// ----------------------------------------------------------------------

export default function ChaptersCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Chapter"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Chapters',
            href: paths.dashboard.chapters.root,
          },
          { name: 'New Chapter' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ChaptersNewEditForm />
    </Container>
  );
}
