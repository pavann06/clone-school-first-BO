import { Helmet } from 'react-helmet-async';

import BannersListView from 'src/sections/banners/view/banners-list-view';

// ----------------------------------------------------------------------

export default function BannersListPage() {
  return (
    <>
      <Helmet>
        <title>Banners List</title>
      </Helmet>

      <BannersListView />
    </>
  );
}