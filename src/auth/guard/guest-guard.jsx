import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { selectAuth } from 'src/redux/auth/selectors';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isLoading } = useSelector(selectAuth);

  return <>{isLoading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const { isLoggedIn } = useSelector(selectAuth);

  const check = useCallback(() => {
    if (isLoggedIn) {
      router.replace(returnTo);
    }
  }, [isLoggedIn, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
