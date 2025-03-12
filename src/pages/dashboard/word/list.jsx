import { Helmet } from 'react-helmet-async';

import { WordListView } from 'src/sections/word/view';

// ----------------------------------------------------------------------

export default function WordListPage() {
  return (
    <>
      <Helmet>
        <title>Word List</title>
      </Helmet>

      <WordListView />
    </>
  );
}
