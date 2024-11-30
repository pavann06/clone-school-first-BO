import { Helmet } from 'react-helmet-async';

import { CitiesCreateView } from 'src/sections/cities/view';

// ----------------------------------------------------------------------

export default function CitiesCreatePage() {
  return (
    <>
      <Helmet>
        <title> New City</title>
      </Helmet>

       <CitiesCreateView />
      
      
    </>
  );
}
