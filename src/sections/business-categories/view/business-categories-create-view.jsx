import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EdutainmentNewEditForm from '../business-categories-new-edit-form';

// ----------------------------------------------------------------------

export default function BusinessCategoriesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Business Category"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Business category',
            href: paths.dashboard.business_categories.root,
          },
          { name: 'New Category' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EdutainmentNewEditForm />
    </Container>
  );
}
