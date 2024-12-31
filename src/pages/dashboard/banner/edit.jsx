import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BannerEditView } from 'src/sections/banner/view';

// ----------------------------------------------------------------------

export default function BannerEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Banners Edit</title>
      </Helmet>

      <BannerEditView id={`${id}`} />
    </>
  );
}
