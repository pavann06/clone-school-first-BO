import { Helmet } from 'react-helmet-async';

import { OfflineCourseListView } from 'src/sections/offline-course/view';

// ----------------------------------------------------------------------

export default function OfflineCourseListPage() {
  return (
    <>
      <Helmet>
        <title>courses List</title>
      </Helmet>

      <OfflineCourseListView />
    </>
  );
}
