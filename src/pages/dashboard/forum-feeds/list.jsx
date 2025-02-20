import { Helmet } from 'react-helmet-async';

import { FerumFeedsListView } from 'src/sections/ferum-feeds/view';
import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ForumFeedsListPage() {
  const { groupId } = useParams(); 
  return (
    <>
      <Helmet>
        <title> Ferom Feeds List</title>
      </Helmet>

      <FerumFeedsListView   groupId = {groupId} />
    </>
  );
}


