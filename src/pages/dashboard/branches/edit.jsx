import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BranchEditView } from 'src/sections/branch/view';

// ----------------------------------------------------------------------

export default function BranchtEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Branch Edit</title>
      </Helmet>

      <BranchEditView id={`${id}`} />
    </>
  );
}
