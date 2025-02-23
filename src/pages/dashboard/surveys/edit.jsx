import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveysEditView } from 'src/sections/surveys/view';

// ----------------------------------------------------------------------

export default function SurveysEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Surveys Edit</title>
      </Helmet>

      <SurveysEditView id={`${id}`} />
    </>
  );
}
