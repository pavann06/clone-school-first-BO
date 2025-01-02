import { Helmet } from 'react-helmet-async';

import { CategoriesCreateView } from 'src/sections/categories/view';

// ----------------------------------------------------------------------

export default function CategoryCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Category </title>
      </Helmet>

      <CategoriesCreateView />
    </>
  );
}
