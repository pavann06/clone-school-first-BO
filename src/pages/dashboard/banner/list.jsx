import { Helmet } from 'react-helmet-async';

import { BannerListView } from 'src/sections/banner/view';

// ----------------------------------------------------------------------

export default function EdutainmentListPage() {
  return (
    <>
      <Helmet>
        <title>Banners List</title>
      </Helmet>

      <BannerListView />
    </>
  );
}
