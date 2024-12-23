import { Helmet } from 'react-helmet-async';

import { SpecialitiesListView } from 'src/sections/specialities/view';

// ----------------------------------------------------------------------

export default function SpecialityListPage() {
  return (
    <>
      <Helmet>
        <title>Speciality List</title>
      </Helmet>

      <SpecialitiesListView />
    </>
  );
}
