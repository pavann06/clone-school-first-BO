import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OnlineStoreProductsEditView } from 'src/sections/onlinestoreproducts/view';

// ----------------------------------------------------------------------

export default function OnlineStoreProductsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> categories Edit</title>
      </Helmet>

      <OnlineStoreProductsEditView id={`${id}`} />
    </>
  );
}
