import { Helmet } from 'react-helmet-async';

import { OfflineCourseCreateView } from 'src/sections/offline-course/view';

// ----------------------------------------------------------------------

export default function OfflineCourseCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Course </title>
      </Helmet>

       <OfflineCourseCreateView />

    </>
  );
}
