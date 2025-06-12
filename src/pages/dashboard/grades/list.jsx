import { Helmet } from 'react-helmet-async';

import { GradesListView } from 'src/sections/grades/view';

// ----------------------------------------------------------------------

export default function GradesListPage() {
  return (
    <>
      <Helmet>
        <title>Grade List</title>
      </Helmet>

      <GradesListView />
    </>
  );
}
