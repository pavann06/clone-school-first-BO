import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { LessonsEditView } from 'src/sections/lessons/view';

// ----------------------------------------------------------------------

export default function LessonsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Lessons Edit</title>
      </Helmet>

      <LessonsEditView id={`${id}`} />
    </>
  );
}
