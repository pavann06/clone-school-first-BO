import { Helmet } from 'react-helmet-async';

import { FamilyServiceCreateView } from 'src/sections/familyservice/view';

// ----------------------------------------------------------------------

export default function FamilyServiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Family </title>
      </Helmet>

      <FamilyServiceCreateView />
    </>
  );
}
