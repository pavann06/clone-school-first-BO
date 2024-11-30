import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PurchaseDetailsView } from 'src/sections/purchase/view';

// ----------------------------------------------------------------------

export default function PurchaseDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Purchase Details</title>
      </Helmet>

      <PurchaseDetailsView id={`${id}`} />
    </>
  );
}
