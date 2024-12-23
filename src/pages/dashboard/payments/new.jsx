import { Helmet } from 'react-helmet-async';

import { PaymentsCreateView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function PaymentsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Payment</title>
      </Helmet>

      <PaymentsCreateView />
    </>
  );
}
