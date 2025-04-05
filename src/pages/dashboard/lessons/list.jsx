import { Helmet } from 'react-helmet-async';

import { LessonsListView } from 'src/sections/lessons/view';

// ----------------------------------------------------------------------

export default function LessonsListPage() {
  return (
    <>
      <Helmet>
        <title>Lessons List</title>
      </Helmet>

      <LessonsListView />
    </>
  );
}
