import { Helmet } from 'react-helmet-async';

import { OnlineOrdersListView } from 'src/sections/onlineorders/view';

// ----------------------------------------------------------------------

export default function OnlineOrdersListPage() {
  return (
    <>
      <Helmet>
        <title> orders</title>
      </Helmet>

      <OnlineOrdersListView />
    </>
  );
}
