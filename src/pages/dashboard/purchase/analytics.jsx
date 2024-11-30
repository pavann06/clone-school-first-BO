import { Helmet } from 'react-helmet-async';

import { PurchaseAnalyticsView } from 'src/sections/purchase/view';

// ----------------------------------------------------------------------

export default function PurchaseAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Purchase Analytics</title>
      </Helmet>

      <PurchaseAnalyticsView/>
    </>
  );
}
