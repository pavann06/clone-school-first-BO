import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { NewsEditView } from 'src/sections/news/view';

// ----------------------------------------------------------------------

export default function NewsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> News Edit</title>
      </Helmet>

      <NewsEditView id={`${id}`} />
    </>
  );
}
