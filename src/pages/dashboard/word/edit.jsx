import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WordEditView } from 'src/sections/word/view';

// ----------------------------------------------------------------------

export default function WordEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Word Edit</title>
      </Helmet>

      <WordEditView id={`${id}`} />
    </>
  );
}
