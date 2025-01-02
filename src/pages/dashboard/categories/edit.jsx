import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CategoriesEditView } from 'src/sections/categories/view';

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Category Edit</title>
      </Helmet>

      <CategoriesEditView id={`${id}`} />
    </>
  );
}
