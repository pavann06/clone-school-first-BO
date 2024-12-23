import { Helmet } from 'react-helmet-async';

import { CalenderListView } from 'src/sections/calenders/view';

// ----------------------------------------------------------------------

export default function CalenderListPage() {
  return (
    <>
      <Helmet>
        <title>Calender List</title>
      </Helmet>

      <CalenderListView />
    </>
  );
}
