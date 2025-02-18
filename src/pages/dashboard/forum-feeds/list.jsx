import { Helmet } from 'react-helmet-async';

import { FerumFeedsListView } from 'src/sections/ferum-feeds/view';

// ----------------------------------------------------------------------

export default function ForumFeedsListPage() {
  return (
    <>
      <Helmet>
        <title> Ferom Feeds List</title>
      </Helmet>

      <FerumFeedsListView />
    </>
  );
}
