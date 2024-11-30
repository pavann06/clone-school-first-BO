import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { StaffEditView } from 'src/sections/satff/view';

// ----------------------------------------------------------------------

export default function StaffEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Staff Edit</title>
      </Helmet>

      <StaffEditView id={`${id}`} />
    </>
  );
}
