import { Helmet } from 'react-helmet-async';

import EdutainmentListView from 'src/sections/edutainment/view/edutainment-list-view';

// ----------------------------------------------------------------------

export default function OnlineStoresListPage() {
  return (
    <>
      <Helmet>
        <title>Speciality List</title>
      </Helmet>

      <EdutainmentListView />
    </>
  );
}