import { Helmet } from 'react-helmet-async';

import { PaymentsListView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function PaymentsListPage() {
  return (
    <>
      <Helmet>
        <title>Payment List</title>
      </Helmet>

      <PaymentsListView />
    </>
  );
}
