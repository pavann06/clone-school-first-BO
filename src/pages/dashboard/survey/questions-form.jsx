import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import { SurveyQuestionsCreateView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyQuestionsCreatePage() {
  const { surveyId } = useParams();  

  return (
    <>
      <Helmet>
        <title> New Question </title>
      </Helmet>

    
      <SurveyQuestionsCreateView 
      surveyId={surveyId}
       />
    </>
  );
}
