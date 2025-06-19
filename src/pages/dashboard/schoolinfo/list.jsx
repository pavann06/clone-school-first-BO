import { Helmet } from 'react-helmet-async';

import { SchoolInfoListView } from 'src/sections/schoolinfo/view';

// ----------------------------------------------------------------------

export default function SchoolInfoListPage() {
  return (
    <>
      <Helmet>
        <title>school Info List</title>
      </Helmet>

      <SchoolInfoListView />
    </>
  );
}
