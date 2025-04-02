import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WebinarEditView } from 'src/sections/webinar/view';

// ----------------------------------------------------------------------

export default function WebinarEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Webinar Edit</title>
      </Helmet>

      <WebinarEditView id={`${id}`} />
    </>
  );
}
