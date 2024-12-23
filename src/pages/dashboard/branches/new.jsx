import { Helmet } from 'react-helmet-async';

import { BranchCreateView } from 'src/sections/branch/view';

// ----------------------------------------------------------------------

export default function BranchCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Branch</title>
      </Helmet>

      <BranchCreateView />
    </>
  );
}
