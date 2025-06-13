import { Helmet } from 'react-helmet-async';

import { EdutainmentCreateView } from 'src/sections/edutainment/view';

// ----------------------------------------------------------------------

export default function EdutainmentCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Feed </title>
      </Helmet>

      <EdutainmentCreateView />
    </>
  );
}
