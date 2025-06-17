import { Helmet } from 'react-helmet-async';

import { GallaryCreateView } from 'src/sections/gallary/view';

// ----------------------------------------------------------------------

export default function GallaryCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Gallary </title>
      </Helmet>

      <GallaryCreateView />
    </>
  );
}
