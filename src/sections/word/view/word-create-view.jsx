import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WordNewEditForm from '../word-new-edit-form';

// ----------------------------------------------------------------------

export default function WordCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Word"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Word',
            href: paths.dashboard.word.root,
          },
          { name: 'New Word' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WordNewEditForm />
    </Container>
  );
}
