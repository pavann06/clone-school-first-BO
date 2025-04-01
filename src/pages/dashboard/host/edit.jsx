import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { HostEditView } from 'src/sections/host/view';

// ----------------------------------------------------------------------

export default function HostEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Host Edit</title>
      </Helmet>

      <HostEditView id={`${id}`} />
    </>
  );
}
