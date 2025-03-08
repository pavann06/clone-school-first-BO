import { Helmet } from 'react-helmet-async';

import { OnlineCategoriesListView } from 'src/sections/onlinecategories/view';

// ----------------------------------------------------------------------

export default function OnlineCategoriesListPage() {
  return (
    <>
      <Helmet>
        <title> Category</title>
      </Helmet>

      <OnlineCategoriesListView />
    </>
  );
}
