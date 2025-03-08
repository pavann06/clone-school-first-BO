import { Helmet } from 'react-helmet-async';

import { OnlineStoreProductsListView } from 'src/sections/onlinestoreproducts/view';

// ----------------------------------------------------------------------

export default function OnlineStoreProductsListPage() {
  return (
    <>
      <Helmet>
        <title> Category</title>
      </Helmet>

      <OnlineStoreProductsListView />
    </>
  );
}
