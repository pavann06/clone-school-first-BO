import { Helmet } from 'react-helmet-async';

import { SurveysCreateView } from 'src/sections/surveys/view';

// ----------------------------------------------------------------------

export default function SurveysCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Survey </title>
      </Helmet>

      <SurveysCreateView />
    </>
  );
}
