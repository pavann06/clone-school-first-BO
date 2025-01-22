import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ListingsEditView } from 'src/sections/listings/view';

// ----------------------------------------------------------------------

export default function ListingsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Listings Edit</title>
      </Helmet>

      <ListingsEditView id={`${id}`} />
    </>
  );
}
