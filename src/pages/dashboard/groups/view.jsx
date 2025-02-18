import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FerumFeedsListView } from 'src/sections/ferum-feeds/view';

// ----------------------------------------------------------------------

export default function GroupsViewPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Feeds List</title>
      </Helmet>

      <FerumFeedsListView id={`${id}`} />
    </>
  );
}