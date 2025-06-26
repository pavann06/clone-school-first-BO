import { Helmet } from 'react-helmet-async';

import { JwtLoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> School First Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
