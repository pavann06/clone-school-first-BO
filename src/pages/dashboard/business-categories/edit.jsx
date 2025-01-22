import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BusinessCategoriesEditView } from 'src/sections/business-categories/view';

// ----------------------------------------------------------------------

export default function BusinessCategoriesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Business Categories Edit</title>
      </Helmet>

      <BusinessCategoriesEditView id={`${id}`} />
    </>
  );
}
