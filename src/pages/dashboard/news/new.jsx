import { Helmet } from 'react-helmet-async';

import { NewsCreateView } from 'src/sections/news/view';

// ----------------------------------------------------------------------

export default function NewsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New News </title>
      </Helmet>

       <NewsCreateView />

    </>
  );
}
