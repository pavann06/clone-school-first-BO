import { Helmet } from 'react-helmet-async';

import { HostCreateView } from 'src/sections/host/view';

// ----------------------------------------------------------------------

export default function HostCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Host </title>
      </Helmet>

       <HostCreateView />

    </>
  );
}
