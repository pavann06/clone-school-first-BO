import { Helmet } from 'react-helmet-async';

import { FamilyServiceListView } from 'src/sections/familyservice/view';

// ----------------------------------------------------------------------

export default function FamilyServiceListPage() {
  return (
    <>
      <Helmet>
        <title>Family List</title>
      </Helmet>

      <FamilyServiceListView />
    </>
  );
}
