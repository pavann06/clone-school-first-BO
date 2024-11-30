import { Helmet } from 'react-helmet-async';

import { GodownCreateView } from 'src/sections/godowns/view';

// ----------------------------------------------------------------------

export default function GodownCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Godown</title>
      </Helmet>

      <GodownCreateView />
    </>
  );
}