import { Helmet } from 'react-helmet-async';

import { McqsListView } from 'src/sections/mcqs/view';

// ----------------------------------------------------------------------

export default function McqsListPage() {
  return (
    <>
      <Helmet>
        <title>MCQs List</title>
      </Helmet>

      <McqsListView />
    </>
  );
}
