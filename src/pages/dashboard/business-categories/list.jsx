import { Helmet } from 'react-helmet-async';

import { BusinessCategoriesListView } from 'src/sections/business-categories/view';

// ----------------------------------------------------------------------

export default function BusinessCategoriesListPage() {
  return (
    <>
      <Helmet>
        <title>Business Categories List</title>
      </Helmet>

      <BusinessCategoriesListView />
    </>
  );
}
