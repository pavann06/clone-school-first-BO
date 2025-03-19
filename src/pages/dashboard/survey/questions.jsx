import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SurveyQuestionListView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function ServeyQuestionsListPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Questions List</title>
      </Helmet>

      <SurveyQuestionListView id={`${id}`} />
    </>
  );
}
