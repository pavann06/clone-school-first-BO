import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CompetionWordsListView } from 'src/sections/competition/view';

// ----------------------------------------------------------------------

export default function CompetitionWordsViewPage() {
  const params = useParams();

  const { id  } = params;

  return (
    <>
      <Helmet>
        <title> Words List</title>
      </Helmet>

      <CompetionWordsListView competitionId={String(id)} />
    </>
  );
}

