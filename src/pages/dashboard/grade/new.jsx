import { Helmet } from 'react-helmet-async';

import { GradeCreateView } from 'src/sections/grade/view';

// ----------------------------------------------------------------------

export default function GradeCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Grade </title>
      </Helmet>

      <GradeCreateView />
    </>
  );
}
