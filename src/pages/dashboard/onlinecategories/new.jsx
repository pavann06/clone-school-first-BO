import { Helmet } from 'react-helmet-async';

import { OnlineCategoriesCreateView } from 'src/sections/onlinecategories/view';

// ----------------------------------------------------------------------

export default function OnlineCategoriesCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Category </title>
      </Helmet>

       <OnlineCategoriesCreateView />

    </>
  );
}
