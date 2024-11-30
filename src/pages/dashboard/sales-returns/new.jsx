import { Helmet } from 'react-helmet-async';

import { ReturnsCreateView } from 'src/sections/sales-returns/view';

// ----------------------------------------------------------------------

export default function ReturnsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Sale Return</title>
      </Helmet>

      <ReturnsCreateView />
    </>
  );
}
