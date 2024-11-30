import { Helmet } from 'react-helmet-async';

import { SpecialitiesCreateView } from 'src/sections/specialities/view';

// ----------------------------------------------------------------------

export default function SpecialityCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Speciality </title>
      </Helmet>

       <SpecialitiesCreateView />
      
      
    </>
  );
}
