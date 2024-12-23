import { Helmet } from 'react-helmet-async';

import { ContactCreateView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContactCreatePage() {
  return (
    <>
      <Helmet>
        <title> New contact</title>
      </Helmet>

      <ContactCreateView />
    </>
  );
}
