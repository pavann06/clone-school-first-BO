import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ReturnsDetailsView } from 'src/sections/sales-returns/view';

// ----------------------------------------------------------------------

export default function ReturnsDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Sales Return Details</title>
      </Helmet>

      <ReturnsDetailsView id={`${id}`} />
    </>
  );
}
