import { Helmet } from 'react-helmet-async';

import { OnlineOrdersCreateView } from 'src/sections/onlineorders/view';

// ----------------------------------------------------------------------

export default function OnlineOrdersCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Order </title>
      </Helmet>

       <OnlineOrdersCreateView />

    </>
  );
}
