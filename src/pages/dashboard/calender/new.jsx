import { Helmet } from 'react-helmet-async';

import { CalenderCreateView } from 'src/sections/calenders/view';

// ----------------------------------------------------------------------

export default function CalenderCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Calender </title>
      </Helmet>

      <CalenderCreateView />
    </>
  );
}
