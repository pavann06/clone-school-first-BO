import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SalesDetailsView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Sales Details</title>
      </Helmet>

      <SalesDetailsView id={`${id}`} />
    </>
  );
}
