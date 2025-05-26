import { Helmet } from 'react-helmet-async';

import { FeelsListView } from 'src/sections/feels/view';

// ----------------------------------------------------------------------

export default function FeelsListPage() {
  return (
    <>
      <Helmet>
        <title>Feels List</title>
      </Helmet>

      <FeelsListView />
    </>
  );
}
