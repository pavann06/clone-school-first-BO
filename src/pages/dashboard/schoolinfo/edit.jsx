import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SchoolInfoEditView } from 'src/sections/schoolinfo/view';

// ----------------------------------------------------------------------

export default function SchoolInfoEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> School Info Edit</title>
      </Helmet>

      <SchoolInfoEditView id={`${id}`} />
    </>
  );
}
