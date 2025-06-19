import { Helmet } from 'react-helmet-async';

import { SchoolInfoCreateView } from 'src/sections/schoolinfo/view';

// ----------------------------------------------------------------------

export default function SchoolInfoCreatePage() {
  return (
    <>
      <Helmet>
        <title> New School Info </title>
      </Helmet>

      <SchoolInfoCreateView />
    </>
  );
}
