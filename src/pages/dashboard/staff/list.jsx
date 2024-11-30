import { Helmet } from 'react-helmet-async';

import { StaffListView } from 'src/sections/satff/view';

// ----------------------------------------------------------------------

export default function StaffListPage() {
  return (
    <>
      <Helmet>
        <title>Staff List</title>
      </Helmet>

      <StaffListView />
    </>
  );
}
