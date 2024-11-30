import { Helmet } from 'react-helmet-async';

import { SalesAnalyticsView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Sales Analytics</title>
      </Helmet>

      <SalesAnalyticsView/>
    </>
  );
}
