import { Helmet } from 'react-helmet-async';

import { EdutainmentListView } from 'src/sections/edutainment/view';


// ----------------------------------------------------------------------

export default function EdutainmentListPage() {
  return (
    <>
      <Helmet>
        <title>Feeds List</title>
      </Helmet>

      <EdutainmentListView />

    </>
  );
}

