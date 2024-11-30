import { Helmet } from 'react-helmet-async';

import { CitiesListView } from 'src/sections/cities/view';

// ----------------------------------------------------------------------

export default function CitiesListPage() {
  return (
    <>
      <Helmet>
        <title>Cities List</title>
      </Helmet>

      <CitiesListView />
    </>
  );
}
