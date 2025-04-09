import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveyQuestionEditView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyQuestionEditPage() {
  const params = useParams();

  const { id , questionId } = params; 


  return (
    <>
      <Helmet>
        <title> Question Edit</title>
      </Helmet>

      <SurveyQuestionEditView id={id} questionId={questionId} />  
    </>
  );
}
