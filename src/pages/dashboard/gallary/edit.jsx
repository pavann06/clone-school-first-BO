import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GallaryEditView } from 'src/sections/gallary/view';

// ----------------------------------------------------------------------

export default function GallaryEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Gallary Edit</title>
      </Helmet>

      <GallaryEditView id={`${id}`} />
    </>
  );
}
