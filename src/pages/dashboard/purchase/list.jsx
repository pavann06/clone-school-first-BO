import { Helmet } from 'react-helmet-async';

import { PurchaseListView } from 'src/sections/purchase/view';

// ----------------------------------------------------------------------

export default function PurchaseListPage() {
  return (
    <>
      <Helmet>
        <title>Purchase List</title>
      </Helmet>

      <PurchaseListView />
    </>
  );
}
