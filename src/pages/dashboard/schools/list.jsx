import { Helmet } from 'react-helmet-async';

import { SchoolListView } from 'src/sections/schools/view';

// ----------------------------------------------------------------------

export default function SchoolListPage() {
  return (
    <>
      <Helmet>
        <title>schools List</title>
      </Helmet>

      <SchoolListView />
    </>
  );
}
