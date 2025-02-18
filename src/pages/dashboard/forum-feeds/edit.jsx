import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FerumFeedsEditView } from 'src/sections/ferum-feeds/view';

// ----------------------------------------------------------------------

export default function ForumFeedsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Forum Feeds Edit</title>
      </Helmet>

      <FerumFeedsEditView id={`${id}`} />
    </>
  );
}
