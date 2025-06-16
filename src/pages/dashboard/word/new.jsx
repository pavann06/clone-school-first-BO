import { Helmet } from 'react-helmet-async';

import { WordCreateView } from 'src/sections/word/view';

// ----------------------------------------------------------------------

export default function WordCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Word </title>
      </Helmet>

      <WordCreateView />
    </>
  );
}
