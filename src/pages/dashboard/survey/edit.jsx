import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveyEditView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Survey Edit</title>
      </Helmet>

      <SurveyEditView id={`${id}`} />
    </>
  );
}
