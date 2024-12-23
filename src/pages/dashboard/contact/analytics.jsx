import { Helmet } from 'react-helmet-async';

import { ContactAnalyticsView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContactAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Contact Analytics</title>
      </Helmet>

      <ContactAnalyticsView />
    </>
  );
}
