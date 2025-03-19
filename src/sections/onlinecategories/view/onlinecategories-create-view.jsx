import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OnlineCategoriesNewEditForm from '../onlinecategories-new-edit-form';

// ----------------------------------------------------------------------

export default function OnlineCategoriesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Category"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Category',
            href: paths.dashboard.onlinecategories.root,
          },
          { name: 'New category' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OnlineCategoriesNewEditForm />
    </Container>
  );
}
