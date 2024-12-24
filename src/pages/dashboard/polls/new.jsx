import { Helmet } from 'react-helmet-async';

import { PollsCreateView } from 'src/sections/polls/view';

// ----------------------------------------------------------------------

export default function PollsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Poll </title>
      </Helmet>

      <PollsCreateView />
    </>
  );
}
