import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FamilyServiceEditView } from 'src/sections/familyservice/view';

// ----------------------------------------------------------------------

export default function FamilyServiceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Family Edit</title>
      </Helmet>

      <FamilyServiceEditView id={`${id}`} />
    </>
  );
}
