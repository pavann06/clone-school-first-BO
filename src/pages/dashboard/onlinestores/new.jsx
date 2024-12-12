import { Helmet } from 'react-helmet-async';

import { OnlieStoresCreateView } from 'src/sections/onlinestores/view';

// ----------------------------------------------------------------------

export default function OnlineStoreCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Speciality </title>
      </Helmet>

       <OnlieStoresCreateView />
      
      
    </>
  );
}
