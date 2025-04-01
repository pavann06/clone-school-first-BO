import { Helmet } from 'react-helmet-async';

import { HostListView } from 'src/sections/host/view';

// ----------------------------------------------------------------------

export default function HostListPage() {
  return (
    <>
      <Helmet>
        <title>host List</title>
      </Helmet>

      <HostListView />
    </>
  );
}
