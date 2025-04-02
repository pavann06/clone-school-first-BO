import { Helmet } from 'react-helmet-async';

import { WebinarListView } from 'src/sections/webinar/view';

// ----------------------------------------------------------------------

export default function WebinarListPage() {
  return (
    <>
      <Helmet>
        <title>Webinar List</title>
      </Helmet>

      <WebinarListView />
    </>
  );
}
