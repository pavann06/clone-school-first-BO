import { Helmet } from 'react-helmet-async';

import { ForumFeedsCreateView } from 'src/sections/ferum-feeds/view';
import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ForumFeedsCreatePage() {
  const { groupId } = useParams(); 
  return (
    <>
      <Helmet>
        <title> New Forum Feed </title>
      </Helmet>

      <ForumFeedsCreateView
      groupId = {groupId} />
    </>
  );
}


// import { Helmet } from 'react-helmet-async';
// import { useParams } from 'src/routes/hooks';
// import { SurveyQuestionsCreateView } from 'src/sections/serveys/view';

// // ----------------------------------------------------------------------

// export default function SurveyQuestionsCreatePage() {
//   const { surveyId } = useParams();  

//   return (
//     <>
//       <Helmet>
//         <title> New Survey </title>
//       </Helmet>

    
//       <SurveyQuestionsCreateView 
//       surveyId={surveyId}
//        />
//     </>
//   );
// }




