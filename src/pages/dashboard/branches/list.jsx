import { Helmet } from 'react-helmet-async';

import { BranchListView } from 'src/sections/branch/view';

// ----------------------------------------------------------------------

export default function BranchListPage() {
  return (
    <>
      <Helmet>
        <title>Branch List</title>
      </Helmet>

      <BranchListView />
    </>
  );
}
