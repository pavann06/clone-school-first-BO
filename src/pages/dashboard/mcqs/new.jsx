import { Helmet } from 'react-helmet-async';

import { McqsCreateView } from 'src/sections/mcqs/view';

// ----------------------------------------------------------------------

export default function McqsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New MCQs </title>
      </Helmet>

       <McqsCreateView />

    </>
  );
}
