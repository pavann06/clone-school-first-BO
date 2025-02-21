import { Helmet } from 'react-helmet-async';

import { ForumFeedsCreateView } from 'src/sections/groups/view';
import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ForumFeedsCreatePage() {
  const { id } = useParams(); 
  console.log("Group ID from URL create page :", id); // Debugging
  return (
    <>
      <Helmet>
        <title> New Forum Feed </title>
      </Helmet>

      <ForumFeedsCreateView gruopId={id} />
    </>
  );
}