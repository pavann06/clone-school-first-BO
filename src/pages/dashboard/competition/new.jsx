import { Helmet } from 'react-helmet-async';

import { CompetitionCreateView } from 'src/sections/competition/view';

// ----------------------------------------------------------------------

export default function CompetitionCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Competition </title>
      </Helmet>

      <CompetitionCreateView />
    </>
  );
}
