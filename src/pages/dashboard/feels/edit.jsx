import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FeelsEditView } from 'src/sections/feels/view';

// ----------------------------------------------------------------------

export default function FeelsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Feels Edit</title>
      </Helmet>

      <FeelsEditView id={`${id}`} />
    </>
  );
}
