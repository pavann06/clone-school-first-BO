import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import LessonsVideoForm from 'src/sections/lessons/video-upload-form';

// ----------------------------------------------------------------------

export default function LessonVideoPage() {
  const params = useParams();

  const { id  } = params;

  return (
    <>
      <Helmet>
        <title> Feeds List</title>
      </Helmet>

      <LessonsVideoForm groupId={String(id)} />
    </>
  );
}