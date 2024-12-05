import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { selectAuth } from 'src/redux/auth/selectors';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { isLoading } = useSelector(selectAuth);

  return <>{isLoading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  // const { isLoggedIn } = useSelector(selectAuth);
  const { isLoggedIn } = true;

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isLoggedIn) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths.jwt;

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
