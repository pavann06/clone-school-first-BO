import { Helmet } from 'react-helmet-async';

import { GradesCreateView } from 'src/sections/grades/view';

// ----------------------------------------------------------------------

export default function GradesCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Grade</title>
      </Helmet>

      <GradesCreateView />
    </>
  );
}
