import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OnlineCategoriesEditView } from 'src/sections/onlinecategories/view';

// ----------------------------------------------------------------------

export default function OnlineCategoriesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> categories Edit</title>
      </Helmet>

      <OnlineCategoriesEditView id={`${id}`} />
    </>
  );
}
