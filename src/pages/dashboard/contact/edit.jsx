import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ContactEditView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContacttEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Contact Edit</title>
      </Helmet>

      <ContactEditView id={`${id}`} />
    </>
  );
}
