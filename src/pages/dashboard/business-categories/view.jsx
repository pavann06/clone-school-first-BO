import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BusinessSubCategoriesListView } from 'src/sections/business-categories/view';

// ----------------------------------------------------------------------

export default function SubCategoriesViewPage() {
  const params = useParams();

  const { id  } = params;

  return (
    <>
      <Helmet>
        <title> Sub Categories List</title>
      </Helmet>

      <BusinessSubCategoriesListView id={`${id}`} />
    </>
  );
}

