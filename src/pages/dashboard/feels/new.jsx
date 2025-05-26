import { Helmet } from 'react-helmet-async';

import { FeelsCreateView } from 'src/sections/feels/view';

// ----------------------------------------------------------------------

export default function FeelsCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Feels </title>
      </Helmet>

      <FeelsCreateView />
    </>
  );
}
