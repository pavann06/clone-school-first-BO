import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import { SurveyQuestionsCreateView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyQuestionsCreatePage() {
  const { surveyId } = useParams();  // Extract the surveyId from URL params

  return (
    <>
      <Helmet>
        <title> New Survey </title>
      </Helmet>

      {/* Pass surveyId to SurveyQuestionsCreateView */}
      <SurveyQuestionsCreateView surveyId={surveyId} />
    </>
  );
}
