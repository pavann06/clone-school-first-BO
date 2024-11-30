import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
// ----------------------------------------------------------------------

const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        element: (
          <GuestGuard>
            <Suspense fallback={<SplashScreen />}>
              <Outlet />
            </Suspense>
          </GuestGuard>
        ),
        children: [
          {
            path: 'login',
            element: (
              <AuthClassicLayout>
                <JwtLoginPage />
              </AuthClassicLayout>
            ),
          },
          {
            path: 'password-forgot',
            element: (
              <AuthModernCompactLayout>
                <ForgotPasswordPage />
              </AuthModernCompactLayout>
            ),
          },
        ],
      },
    ],
  },
];

export { authRoutes };
