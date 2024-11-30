import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SpecialitiesEditView } from 'src/sections/specialities/view';

// ----------------------------------------------------------------------

export default function SpecialitiesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Specialities Edit</title>
      </Helmet>

      <SpecialitiesEditView id={`${id}`} />
    </>
  );
}
