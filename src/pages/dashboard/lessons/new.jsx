import { Helmet } from 'react-helmet-async';

import { LessonsCreateView } from 'src/sections/lessons/view';

// ----------------------------------------------------------------------

export default function LessonsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Lessons </title>
      </Helmet>

       <LessonsCreateView />

    </>
  );
}
