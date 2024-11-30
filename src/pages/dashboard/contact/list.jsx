import { Helmet } from 'react-helmet-async';

import { ContactListView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContactListPage() {
  return (
    <>
      <Helmet>
        <title>Contact List</title>
      </Helmet>

      <ContactListView />
    </>
  );
}
