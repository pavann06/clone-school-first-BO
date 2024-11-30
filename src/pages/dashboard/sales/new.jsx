import { Helmet } from 'react-helmet-async';

import { SalesCreateView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Sale</title>
      </Helmet>

      <SalesCreateView />
    </>
  );
}
