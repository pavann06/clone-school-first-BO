import { Helmet } from 'react-helmet-async';

import { OfflineCoursesCreateView } from 'src/sections/offlinecourses/view';

// ----------------------------------------------------------------------

export default function OfflineCoursesCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Course </title>
      </Helmet>

       <OfflineCoursesCreateView />

    </>
  );
}
