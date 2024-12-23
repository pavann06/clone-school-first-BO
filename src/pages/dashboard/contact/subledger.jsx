import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ContactSubLedgerView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContactSubLedgerPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Contact Sub Ledger</title>
      </Helmet>

      <ContactSubLedgerView id={`${id}`} />
    </>
  );
}
