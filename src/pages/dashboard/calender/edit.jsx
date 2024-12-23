import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CalenderEditView } from 'src/sections/calenders/view';

// ----------------------------------------------------------------------

export default function CalenderEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Calender Edit</title>
      </Helmet>

      <CalenderEditView id={`${id}`} />
    </>
  );
}
