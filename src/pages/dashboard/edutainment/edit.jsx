import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { EdutainmentEditView } from 'src/sections/edutainment/view';

// ----------------------------------------------------------------------

export default function EdutainmentEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Edutainment Edit</title>
      </Helmet>

      <EdutainmentEditView id={`${id}`} />
    </>
  );
}