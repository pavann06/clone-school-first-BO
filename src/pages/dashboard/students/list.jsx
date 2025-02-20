import { Helmet } from 'react-helmet-async';

import { StudentsListView } from 'src/sections/students/view';

// ----------------------------------------------------------------------

export default function StudentsListPage() {
  return (
    <>
      <Helmet>
        <title>Students List</title>
      </Helmet>

      <StudentsListView />
    </>
  );
}
