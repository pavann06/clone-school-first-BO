import { Helmet } from 'react-helmet-async';

import { SurveyQuestionsCreateView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyQuestionsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Survey </title>
      </Helmet>

      <SurveyQuestionsCreateView />
    </>
  );
}
