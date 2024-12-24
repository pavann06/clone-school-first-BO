import { Helmet } from 'react-helmet-async';

import { OnlineStoreListView } from 'src/sections/onlinestores/view';

// ----------------------------------------------------------------------

export default function OnlineStoresListPage() {
  return (
    <>
      <Helmet>
        <title>Speciality List</title>
      </Helmet>

      <OnlineStoreListView />
    </>
  );
}
