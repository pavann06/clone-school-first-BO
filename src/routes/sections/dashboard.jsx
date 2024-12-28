import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { AuthGuard, PermissionBasedGuard } from 'src/auth/guard';

import { LoadingScreen } from 'src/components/loading-screen';

// import { Lazy } from 'yup';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/booking'));

// CITIES
const CitiesListPage = lazy(() => import('src/pages/dashboard/cities/list'));
const CitiesCreatePage = lazy(() => import('src/pages/dashboard/cities/new'));

const SpecialitiesListPage = lazy(() => import('src/pages/dashboard/specialities/list'));
const SpecialitiesCreatePage = lazy(() => import('src/pages/dashboard/specialities/new'));
const SpecialitiesEditPage = lazy(() => import('src/pages/dashboard/specialities/edit'));

// const FeaturesListPage = lazy(() => import('src/pages/dashboard/features/list'));
// const FeatureCreatePage = lazy(() => import('src/pages/dashboard/features/new'));
// const FeaturesEditPage = lazy(() => import('src/pages/dashboard/features/edit'));

const BannersListPage = lazy(() => import('src/pages/dashboard/banners/list'));
const BannersCreatePage = lazy(() => import('src/pages/dashboard/banners/new'));
const BannersEditPage = lazy(() => import('src/pages/dashboard/banners/edit'));

const HospitalListPage = lazy(() => import('src/pages/dashboard/hospitals/list'));
const HospitalCreatePage = lazy(() => import('src/pages/dashboard/hospitals/new'));
const HospitalsEditPage = lazy(() => import('src/pages/dashboard/hospitals/edit'));

const AppointmentsViewPage = lazy(() => import('src/pages/dashboard/hospitals/view'));

// Sales
const SalesListPage = lazy(() => import('src/pages/dashboard/sales/list'));
const SalesCreatePage = lazy(() => import('src/pages/dashboard/sales/new'));
const SalesEditPage = lazy(() => import('src/pages/dashboard/sales/edit'));
const SalesDetailsPage = lazy(() => import('src/pages/dashboard/sales/details'));
const SalesAnalyticsPage = lazy(() => import('src/pages/dashboard/sales/analytics'));

// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

const EdutainmentListPage = lazy(() => import('src/pages/dashboard/edutainment/list'));
const EdutainmentCreatePage = lazy(() => import('src/pages/dashboard/edutainment/new'));
const EdutainmentEditPage = lazy(() => import('src/pages/dashboard/edutainment/edit'));

const OnlineStoresListPage = lazy(() => import('src/pages/dashboard/edutainment/list'));
const OnlineStoresCreatePage = lazy(() => import('src/pages/dashboard/edutainment/new'));

const CalenderListPage = lazy(() => import('src/pages/dashboard/calender/list'));
const CalenderCreatePage = lazy(() => import('src/pages/dashboard/calender/new'));
const CalenderEditPage = lazy(() => import('src/pages/dashboard/calender/edit'));

const PollsListPage = lazy(() => import('src/pages/dashboard/polls/list'));
const PollsCreatePage = lazy(() => import('src/pages/dashboard/polls/new'));
const PollsEditPage = lazy(() => import('src/pages/dashboard/polls/edit'));


const SurveyListPage = lazy(() => import('src/pages/dashboard/survey/list'));
const SurveyCreatePage = lazy(() => import('src/pages/dashboard/survey/new'));
const SurveyEditPage = lazy(() => import('src/pages/dashboard/survey/edit'));


// WELCOME PAGE

const WelcomePage = lazy(() => import('src/pages/dashboard/welcome'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        element: (
          <PermissionBasedGuard hasContent permissions={['is_superuser']}>
            <IndexPage />
          </PermissionBasedGuard>
        ),
        index: true,
      },
      {
        path: 'cities',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CitiesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CitiesCreatePage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },
      {
        path: 'specialities',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SpecialitiesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SpecialitiesCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SpecialitiesEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },
      {
        path: 'edutainment',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <EdutainmentListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <EdutainmentCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <EdutainmentEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'onlinestores',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineStoresListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineStoresCreatePage />
              </PermissionBasedGuard>
            ),
          },
          // {
          //   path: ':id/edit',
          //   element: (
          //     <PermissionBasedGuard hasContent permissions={['is_superuser']}>
          //       <FeaturesEditPage />
          //     </PermissionBasedGuard>
          //   ),
          // },
        ],
      },

      {
        path: 'calender',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CalenderListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CalenderCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CalenderEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'polls',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <PollsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <PollsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <PollsEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },   


      {
        path: 'servey',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveyListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveyCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveyEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      }, 

      // {
      //   path: 'appointments',
      //   children: [
      //     {
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <AppointmentsListPage />
      //         </PermissionBasedGuard>
      //       ),
      //       index: true,
      //     },
      //     {
      //       path: 'new',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <AppointmentsCreatePage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //     {
      //       path: ':id/edit',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <AppointmentsEditPage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //   ],
      // },

      {
        path: 'banners',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BannersListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BannersCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BannersEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'hospitals',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <HospitalListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <HospitalCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <HospitalsEditPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/view',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <AppointmentsViewPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'sales',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_read_sales']}>
                <SalesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: ':id',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_read_sales']}>
                <SalesDetailsPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_write_sales']}>
                <SalesCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_update_sales']}>
                <SalesEditPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: 'analytics',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_read_sales_analytics']}>
                <SalesAnalyticsPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
