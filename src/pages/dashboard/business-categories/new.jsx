import { Helmet } from 'react-helmet-async';

import { BusinessCategoriesCreateView } from 'src/sections/business-categories/view';

// ----------------------------------------------------------------------

export default function BusinessCategoriesCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Business Categories </title>
      </Helmet>

       <BusinessCategoriesCreateView />

    </>
  );
}
