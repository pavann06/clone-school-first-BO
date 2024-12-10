import { Helmet } from 'react-helmet-async';

import EdutainmentCreatePage from '../onlinestores/new';

// ----------------------------------------------------------------------

export default function OnlineStoresCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Speciality </title>
      </Helmet>

       <EdutainmentCreatePage />
      
      
    </>
  );
}
