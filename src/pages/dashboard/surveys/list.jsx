import { Helmet } from 'react-helmet-async';

import { SurveysListView } from 'src/sections/surveys/view';

// ----------------------------------------------------------------------

export default function SurveysListPage() {
  return (
    <>
      <Helmet>
        <title>Surveys List</title>
      </Helmet>

      <SurveysListView />
    </>
  );
}
