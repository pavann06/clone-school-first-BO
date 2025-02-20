import { Helmet } from 'react-helmet-async';

import { SchoolCreateView } from 'src/sections/schools/view';

// ----------------------------------------------------------------------

export default function SchoolCreatePage() {
  return (
    <>
      <Helmet>
        <title> New School </title>
      </Helmet>

      <SchoolCreateView />
    </>
  );
}
