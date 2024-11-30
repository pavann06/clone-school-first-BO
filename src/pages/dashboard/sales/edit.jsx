import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SalesEditView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Sales Edit</title>
      </Helmet>

      <SalesEditView id={`${id}`} />
    </>
  );
}
