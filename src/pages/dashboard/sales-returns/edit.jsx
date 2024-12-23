import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ReturnsEditView } from 'src/sections/sales-returns/view';

// ----------------------------------------------------------------------

export default function ReturnsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Sales Return Edit</title>
      </Helmet>

      <ReturnsEditView id={`${id}`} />
    </>
  );
}
