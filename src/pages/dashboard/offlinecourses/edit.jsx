import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OfflineCoursesEditView } from 'src/sections/offlinecourses/view';

// ----------------------------------------------------------------------

export default function OfflineCoursesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Courses Edit</title>
      </Helmet>

      <OfflineCoursesEditView id={`${id}`} />
    </>
  );
}
