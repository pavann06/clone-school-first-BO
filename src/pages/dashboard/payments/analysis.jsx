import { Helmet } from 'react-helmet-async';

import { PaymentsAnalysisView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function PaymentsAnalysisPage() {
  return (
    <>
      <Helmet>
        <title>Payment Analysis</title>
      </Helmet>

      <PaymentsAnalysisView />
    </>
  );
}
