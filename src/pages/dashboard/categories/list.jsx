import { Helmet } from 'react-helmet-async';

import { CategoryListView } from 'src/sections/categories/view';

// ----------------------------------------------------------------------

export default function CategoryListPage() {
  return (
    <>
      <Helmet>
        <title>Categories List</title>
      </Helmet>

      <CategoryListView />
    </>
  );
}
