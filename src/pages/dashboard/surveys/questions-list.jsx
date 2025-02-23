import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveysQuestionsListView } from 'src/sections/surveys/view';

// ----------------------------------------------------------------------

export default function SurveysQuestionsViewPage() {
  const params = useParams();

  const { id  } = params;

  return (
    <>
      <Helmet>
        <title> Questions List</title>
      </Helmet>

      <SurveysQuestionsListView surveyId={String(id)} />
    </>
  );
}