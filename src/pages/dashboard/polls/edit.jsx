import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PollsEditView } from 'src/sections/polls/view';

// ----------------------------------------------------------------------

export default function PollsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Polls Edit</title>
      </Helmet>

      <PollsEditView id={`${id}`} />
    </>
  );
}
