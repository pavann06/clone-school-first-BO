import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { McqEditView } from 'src/sections/mcq/view';

// ----------------------------------------------------------------------

export default function McqEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> mcq Edit</title>
      </Helmet>

      <McqEditView id={`${id}`} />
    </>
  );
}
