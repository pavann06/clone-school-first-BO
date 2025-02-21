import { Helmet } from 'react-helmet-async';

import { ForumFeedsCreateView } from 'src/sections/groups/view';
import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ForumFeedsCreatePage() {
  const { groupId } = useParams(); 
  return (
    <>
      <Helmet>
        <title> New Forum Feed </title>
      </Helmet>

      <ForumFeedsCreateView groupId={groupId} />
    </>
  );
}