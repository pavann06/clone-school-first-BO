import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BannersEditView } from 'src/sections/banners/view';

// ----------------------------------------------------------------------

export default function BannersEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Banners Edit</title>
      </Helmet>

      <BannersEditView id={`${id}`} />
    </>
  );
}
