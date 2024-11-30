import { Helmet } from 'react-helmet-async';

import { GodownListView } from 'src/sections/godowns/view';

// ----------------------------------------------------------------------

export default function GodownListPage() {
  return (
    <>
      <Helmet>
        <title>Godown List</title>
      </Helmet>

      <GodownListView />
    </>
  );
}
