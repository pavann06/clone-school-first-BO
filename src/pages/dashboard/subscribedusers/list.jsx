import { Helmet } from 'react-helmet-async';

import { SubscribedusersListView } from 'src/sections/subscribedusers/views';

// ----------------------------------------------------------------------

export default function SubscribedusersListPage() {
  return (
    <>
      <Helmet>
        <title>Subscribed Users List</title>
      </Helmet>

      <SubscribedusersListView />
    </>
  );
}
