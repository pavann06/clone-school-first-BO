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

const SubscribedusersListPage = lazy(() => import('src/pages/dashboard/subscribedusers/list'));

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





const PollsListPage = lazy(() => import('src/pages/dashboard/polls/list'));
const PollsCreatePage = lazy(() => import('src/pages/dashboard/polls/new'));
const PollsEditPage = lazy(() => import('src/pages/dashboard/polls/edit'));

const BannerListPage = lazy(() => import('src/pages/dashboard/banner/list'));
const BannerCreatePage = lazy(() => import('src/pages/dashboard/banner/new'));
const BannerEditPage = lazy(() => import('src/pages/dashboard/banner/edit'));

const NewsListPage = lazy(() => import('src/pages/dashboard/news/list'));
const NewsCreatePage = lazy(() => import('src/pages/dashboard/news/new'));
const NewsEditPage = lazy(() => import('src/pages/dashboard/news/edit'));

const CategoryListPage = lazy(() => import('src/pages/dashboard/categories/list'));
const CategoryCreatePage = lazy(() => import('src/pages/dashboard/categories/new'));
const CategoryEditPage = lazy(() => import('src/pages/dashboard/categories/edit'));

const BusinessCategoriesListPage = lazy(
  () => import('src/pages/dashboard/business-categories/list')
);
const BusinessCategoriesCreatePage = lazy(
  () => import('src/pages/dashboard/business-categories/new')
);
const BusinessCategoriesEditPage = lazy(
  () => import('src/pages/dashboard/business-categories/edit')
);
const SubCategoriesViewPage = lazy(
  () => import('src/pages/dashboard/business-categories/view')
);


const SchoolListPage = lazy(() => import('src/pages/dashboard/schools/list'));
const SchoolCreatePage = lazy(() => import('src/pages/dashboard/schools/new'));
const SchoolEditPage = lazy(() => import('src/pages/dashboard/schools/edit'));

const StudentsListPage = lazy(() => import('src/pages/dashboard/students/list'));
const StudentsCreatePage = lazy(() => import('src/pages/dashboard/students/new'));
const StudentsEditPage = lazy(() => import('src/pages/dashboard/students/edit'));



const HostListPage = lazy(()=> import('src/pages/dashboard/host/list'));
const HostCreatePage = lazy(() => import('src/pages/dashboard/host/new'));
const HostEditPage = lazy(() => import('src/pages/dashboard/host/edit'));

const WebinarListPage = lazy(() => import('src/pages/dashboard/webinar/list'));
const WebinarCreatePage = lazy(() => import('src/pages/dashboard/webinar/new'));
const WebinarEditPage = lazy(() => import('src/pages/dashboard/webinar/edit'));

const LessonsListPage = lazy(() => import('src/pages/dashboard/lessons/list'));
const LessonsCreatePage = lazy(() => import('src/pages/dashboard/lessons/new')); 
const LessonsEditPage = lazy(() => import('src/pages/dashboard/lessons/edit'));
const LessonVideoPage = lazy(() => import('src/pages/dashboard/lessons/video-view'));

const GradesListPage = lazy(() => import('src/pages/dashboard/grades/list'));
const GradesCreatePage = lazy(() => import('src/pages/dashboard/grades/new'));
const GradesEditPage = lazy(() => import('src/pages/dashboard/grades/edit'));






const DashboardListPage = lazy(() => import('src/pages/dashboard/dashboard/home-demo'));










// const SurveyListPage = lazy(() => import('src/pages/dashboard/survey/list'));
// const SurveyCreatePage = lazy(() => import('src/pages/dashboard/survey/new'));
// const SurveyEditPage = lazy(() => import('src/pages/dashboard/survey/edit'));
// const SurveyQuestionEditPage = lazy(() => import('src/pages/dashboard/survey/questions-edit'));
// const ServeyQuestionsListPage = lazy(() => import('src/pages/dashboard/survey/questions'));
// const SurveyQuestionsCreatePage = lazy(() => import('src/pages/dashboard/survey/questions-form'));

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
        path: 'subscribedusers',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SubscribedusersListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          // {
          //   path: 'new',
          //   element: (
          //     <PermissionBasedGuard hasContent permissions={['is_superuser']}>
          //       <EdutainmentCreatePage />
          //     </PermissionBasedGuard>
          //   ),
          // },
          // {
          //   path: ':id/edit',
          //   element: (
          //     <PermissionBasedGuard hasContent permissions={['is_superuser']}>
          //       <EdutainmentEditPage />
          //     </PermissionBasedGuard>
          //   ),
          // },
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
        path: 'banner',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BannerListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BannerCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BannerEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'news',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <NewsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <NewsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <NewsEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'categories',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CategoryListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CategoryCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CategoryEditPage />
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

     

      {
        path: 'business_categories',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BusinessCategoriesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BusinessCategoriesCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <BusinessCategoriesEditPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/view',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SubCategoriesViewPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

     


      {
        path: 'schools',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SchoolListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SchoolCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SchoolEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },


      
      {
        path: 'students',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <StudentsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <StudentsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <StudentsEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },


     
      {
        path: 'host',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <HostListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <HostCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <HostEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'webinar',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <WebinarListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <WebinarCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <WebinarEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      
      {
        path: 'lessons',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <LessonsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <LessonsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <LessonsEditPage />
              </PermissionBasedGuard>
            ),
          },
            {
            path: ':id/video',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <LessonVideoPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },



        {
        path: 'grades',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GradesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GradesCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GradesEditPage />
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
