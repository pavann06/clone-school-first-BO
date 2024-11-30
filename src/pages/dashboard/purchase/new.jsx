import { Helmet } from 'react-helmet-async';

import { PurchaseCreateView } from 'src/sections/purchase/view';

// ----------------------------------------------------------------------

export default function PurchaseCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Purchase</title>
      </Helmet>

      <PurchaseCreateView />
    </>
  );
}
