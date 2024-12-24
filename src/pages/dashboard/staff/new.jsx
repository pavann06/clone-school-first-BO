import { Helmet } from 'react-helmet-async';

import { StaffCreateView } from 'src/sections/satff/view';

// ----------------------------------------------------------------------

export default function StaffCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Staff</title>
      </Helmet>

      <StaffCreateView />
    </>
  );
}
