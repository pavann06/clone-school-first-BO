import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OfflineCourseEditView } from 'src/sections/offline-course/view';

// ----------------------------------------------------------------------

export default function OfflineCourseEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Courses Edit</title>
      </Helmet>

      <OfflineCourseEditView id={`${id}`} />
    </>
  );
}
