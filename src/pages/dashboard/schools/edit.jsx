import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SchoolEditView } from 'src/sections/schools/view';

// ----------------------------------------------------------------------

export default function SchoolEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> School Edit</title>
      </Helmet>

      <SchoolEditView id={`${id}`} />
    </>
  );
}
