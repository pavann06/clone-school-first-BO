import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OnlineOrdersEditView } from 'src/sections/onlineorders/view';

// ----------------------------------------------------------------------

export default function OnlineOrdersEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Orders Edit</title>
      </Helmet>

      <OnlineOrdersEditView id={`${id}`} />
    </>
  );
}
