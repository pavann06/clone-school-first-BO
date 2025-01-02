

import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CategoriesNewEditForm from '../categories-new-edit-form';

// ------------------------------------------------------------------------

export default function CategoriesEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['calender', id],
    queryFn: () => request.get(`backoffice/news/categories/${id}`),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Category',
            href: paths.dashboard.categories.root,
          },
          { name: data?.data?.calender },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <CategoriesNewEditForm currentCategory={data?.data} />}
    </Container>
  );
}

CategoriesEditView.propTypes = {
  id: PropTypes.string, // Validate id as a required string
};

// CategoriesEditView.propTypes = {
//   currentCategory: PropTypes.object, // Ensure currentCalender is validated
// };
