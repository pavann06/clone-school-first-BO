import { Helmet } from 'react-helmet-async';

import { SurveysQuestionsCreateView } from 'src/sections/surveys/view';
import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ForumFeedsCreatePage() {
  const { id } = useParams(); 
  console.log("Group ID from URL create page :", id); // Debugging
  return (
    <>
      <Helmet>
        <title> New Question </title>
      </Helmet>

      <SurveysQuestionsCreateView SurveyId={id} />
    </>
  );
}