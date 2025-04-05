import { Helmet } from 'react-helmet-async';

import { OfflineCoursesListView } from 'src/sections/offlinecourses/view';

// ----------------------------------------------------------------------

export default function OfflineCoursesListPage() {
  return (
    <>
      <Helmet>
        <title>courses List</title>
      </Helmet>

      <OfflineCoursesListView />
    </>
  );
}
