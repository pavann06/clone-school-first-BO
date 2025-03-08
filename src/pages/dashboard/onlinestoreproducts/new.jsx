import { Helmet } from 'react-helmet-async';

import { OnlineStoreProductsCreateView } from 'src/sections/onlinestoreproducts/view';

// ----------------------------------------------------------------------

export default function OnlineStoreProductsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Category </title>
      </Helmet>

       <OnlineStoreProductsCreateView />

    </>
  );
}
