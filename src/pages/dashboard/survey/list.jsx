import { Helmet } from 'react-helmet-async';

import { SurveyListView } from 'src/sections/serveys/view';

// ----------------------------------------------------------------------

export default function SurveyListPage() {
  return (
    <>
      <Helmet>
        <title>Survey List</title>
      </Helmet>

      <SurveyListView />
    </>
  );
}
