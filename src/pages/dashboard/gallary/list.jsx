import { Helmet } from 'react-helmet-async';

import { GallaryListView } from 'src/sections/gallary/view';

// ----------------------------------------------------------------------

export default function GallaryListPage() {
  return (
    <>
      <Helmet>
        <title>Gallary List</title>
      </Helmet>

      <GallaryListView />
    </>
  );
}
