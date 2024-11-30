import { Helmet } from 'react-helmet-async';

import WelcomeView from 'src/sections/welcome/view';

// ----------------------------------------------------------------------

export default function WelcomePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Welcome</title>
      </Helmet>

      <WelcomeView />
    </>
  );
}
