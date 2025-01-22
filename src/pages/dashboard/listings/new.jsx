import { Helmet } from 'react-helmet-async';

import { ListingsCreateView } from 'src/sections/listings/view';

// ----------------------------------------------------------------------

export default function ListingsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Listings </title>
      </Helmet>

       <ListingsCreateView />

    </>
  );
}
