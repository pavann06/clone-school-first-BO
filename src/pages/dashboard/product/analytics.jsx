import { Helmet } from 'react-helmet-async';

import { ProductAnalyticsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Product Analytics</title>
      </Helmet>

      <ProductAnalyticsView/>
    </>
  );
}
