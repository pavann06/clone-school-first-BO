import { Helmet } from 'react-helmet-async';

import { WebinarCreateView } from 'src/sections/webinar/view';

// ----------------------------------------------------------------------

export default function WebinarCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Webinar </title>
      </Helmet>

      <WebinarCreateView />
    </>
  );
}
