import { Helmet } from 'react-helmet-async';

import { ReturnsAnalyticsView } from 'src/sections/sales-returns/view';

// ----------------------------------------------------------------------

export default function ReturnsAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Returns Analytics</title>
      </Helmet>

      <ReturnsAnalyticsView />
    </>
  );
}
