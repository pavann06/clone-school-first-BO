import { Helmet } from 'react-helmet-async';

import { SurveyCreateView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Survey </title>
      </Helmet>

      <SurveyCreateView />
    </>
  );
}
