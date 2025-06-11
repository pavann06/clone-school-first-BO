import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GradeEditView } from 'src/sections/grade/view';
// ----------------------------------------------------------------------

export default function GradeEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Grade Edit</title>
      </Helmet>

      <GradeEditView id={`${id}`} />
    </>
  );
}
