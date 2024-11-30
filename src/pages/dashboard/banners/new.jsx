import { Helmet } from 'react-helmet-async';

import { BannersCreateView } from 'src/sections/banners/view';

// ----------------------------------------------------------------------

export default function BannersCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Banner </title>
      </Helmet>

       <BannersCreateView />
      
      
    </>
  );
}
