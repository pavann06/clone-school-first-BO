import { Helmet } from 'react-helmet-async';

import { ListingsListView } from 'src/sections/listings/view';

// ----------------------------------------------------------------------

export default function ListingsListPage() {
  return (
    <>
      <Helmet>
        <title>Listings List</title>
      </Helmet>

      <ListingsListView />
    </>
  );
}
