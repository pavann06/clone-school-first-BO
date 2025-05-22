// import { Helmet } from 'react-helmet-async';

// import { useParams } from 'src/routes/hooks';

// import LessonsVideoForm from 'src/sections/lessons/video-upload-form';

// // ----------------------------------------------------------------------

// export default function LessonVideoPage() {
//   const params = useParams();

//   const { id  } = params;

//   return (
//     <>
//       <Helmet>
//         <title> Feeds List</title>
//       </Helmet>

//       <LessonsVideoForm id={`${id}`} />
//     </>
//   );
// }

import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import { LessonsVideoView } from 'src/sections/lessons/view';

export default function LessonVideoPage() {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Edit Lesson Video </title>
      </Helmet>

      <LessonsVideoView id={id} />
    </>
  );
}
