import { Helmet } from 'react-helmet-async';

import { ReturnsListView } from 'src/sections/sales-returns/view';

// ----------------------------------------------------------------------

export default function ReturnsListPage() {
  return (
    <>
      <Helmet>
        <title>Sales Return List</title>
      </Helmet>

      <ReturnsListView />
    </>
  );
}
