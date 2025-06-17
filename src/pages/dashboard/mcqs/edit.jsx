import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { McqsEditView } from 'src/sections/mcqs/view';

// ----------------------------------------------------------------------

export default function McqsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> MCQs Edit</title>
      </Helmet>

      <McqsEditView id={`${id}`} />
    </>
  );
}
