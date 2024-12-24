import { Helmet } from 'react-helmet-async';

import { PollsListView } from 'src/sections/polls/view';

// ----------------------------------------------------------------------

export default function PollsListPage() {
  return (
    <>
      <Helmet>
        <title>Polls List</title>
      </Helmet>

      <PollsListView />
    </>
  );
}
