import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { StudentsEditView } from 'src/sections/students/view';

// ----------------------------------------------------------------------

export default function StudentsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Students Edit</title>
      </Helmet>

      <StudentsEditView id={`${id}`} />
    </>
  );
}
