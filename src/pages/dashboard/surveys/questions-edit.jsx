import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveysQuestionsEditView } from 'src/sections/surveys/view';
// ----------------------------------------------------------------------

export default function SurveysQuestionsEditPage() {
  const params = useParams();

  const { id , questionId} = params;

  return (
    <>
      <Helmet>
        <title> Questions Edit</title>
      </Helmet>

      <SurveysQuestionsEditView id={id} questionId={questionId} />
    </>
  );
}
