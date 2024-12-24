import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GodownEditView } from 'src/sections/godowns/view';

// ----------------------------------------------------------------------

export default function GodownEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Godown Edit</title>
      </Helmet>

      <GodownEditView id={`${id}`} />
    </>
  );
}
