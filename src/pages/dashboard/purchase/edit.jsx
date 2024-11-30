import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PurchaseEditView } from 'src/sections/purchase/view';

// ----------------------------------------------------------------------

export default function PurchaseEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Purchase Edit</title>
      </Helmet>

      <PurchaseEditView id={`${id}`} />
    </>
  );
}
