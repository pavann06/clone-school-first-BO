import { Helmet } from 'react-helmet-async';

import { ChaptersListView } from 'src/sections/chapters/view';

// ----------------------------------------------------------------------

export default function ChaptersListPage() {
  return (
    <>
      <Helmet>
        <title>Chapters List</title>
      </Helmet>

      <ChaptersListView />
    </>
  );
}
