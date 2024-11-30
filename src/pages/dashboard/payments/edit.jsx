import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PaymentsEditView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function PaymentsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Payment Edit</title>
      </Helmet>

      <PaymentsEditView id={`${id}`} />
    </>
  );
}
