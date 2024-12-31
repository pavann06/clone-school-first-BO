import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveyQuestionsCreateView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyQuestionsCreatePage() {
   const params = useParams();
  
    const { surveyId } = params;
  return (
    <>
      <Helmet>
        <title> New Survey </title>
      </Helmet>

      <SurveyQuestionsCreateView surveyId={surveyId} />
    </>
  );
}
