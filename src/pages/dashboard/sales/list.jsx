import { Helmet } from 'react-helmet-async';

import { SalesListView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesListPage() {
  return (
    <>
      <Helmet>
        <title>sales List</title>
      </Helmet>

      <SalesListView />
    </>
  );
}