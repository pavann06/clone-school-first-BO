import { Helmet } from 'react-helmet-async';

import { GradeListView } from 'src/sections/grade/view';

// ----------------------------------------------------------------------

export default function GradeListPage() {
  return (
    <>
      <Helmet>
        <title>Grades List</title>
      </Helmet>

      <GradeListView />
    </>
  );
}
