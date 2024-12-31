import { Helmet } from 'react-helmet-async';

import { BannerCreateView } from 'src/sections/banner/view';

// ----------------------------------------------------------------------

export default function BannerCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Banners </title>
      </Helmet>

      <BannerCreateView />
    </>
  );
}
