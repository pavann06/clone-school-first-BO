import { Helmet } from 'react-helmet-async';

import { StudentsCreateView } from 'src/sections/students/view';

// ----------------------------------------------------------------------

export default function StudentsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Student </title>
      </Helmet>

      <StudentsCreateView />
    </>
  );
}
