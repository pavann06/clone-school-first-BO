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

const BannerListPage = lazy(() => import('src/pages/dashboard/banner/list'));
const BannerCreatePage = lazy(() => import('src/pages/dashboard/banner/new'));
const BannerEditPage = lazy(() => import('src/pages/dashboard/banner/edit'));

const NewsListPage = lazy(() => import('src/pages/dashboard/news/list'));
const NewsCreatePage = lazy(() => import('src/pages/dashboard/news/new'));
const NewsEditPage = lazy(() => import('src/pages/dashboard/news/edit'));

const CategoryListPage = lazy(() => import('src/pages/dashboard/categories/list'));
const CategoryCreatePage = lazy(() => import('src/pages/dashboard/categories/new'));
const CategoryEditPage = lazy(() => import('src/pages/dashboard/categories/edit'));

const ListingsListPage = lazy(() => import('src/pages/dashboard/listings/list'));
const ListingsCreatePage = lazy(() => import('src/pages/dashboard/listings/new'));
const ListingsEditPage = lazy(() => import('src/pages/dashboard/listings/edit'));

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

const GroupsListPage = lazy(() => import('src/pages/dashboard/groups/list'));
const GroupsCreatePage = lazy(() => import('src/pages/dashboard/groups/new'));
const GroupsEditPage = lazy(() => import('src/pages/dashboard/groups/edit'));
const GroupsViewPage = lazy(() => import('src/pages/dashboard/groups/view'));

const ForumFeedsListPage = lazy(() => import('src/pages/dashboard/groups/feeds-list'));
const ForumFeedsCreatePage = lazy(() => import('src/pages/dashboard/groups/feeds-new'));
const ForumFeedsEditPage = lazy(() => import('src/pages/dashboard/groups/feeds-edit'));



const SurveysListPage = lazy(() => import('src/pages/dashboard/surveys/list'));
const SurveysCreatePage = lazy(() => import('src/pages/dashboard/surveys/new'));
const SurveysEditPage = lazy(() => import('src/pages/dashboard/surveys/edit'));
const SurveysQuestionsViewPage = lazy (() => import('src/pages/dashboard/surveys/questions-list'));
const SurveysQuestionsCreatePage = lazy(() => import('src/pages/dashboard/surveys/questions-new'));
const SurveysQuestionsEditPage = lazy(() => import('src/pages/dashboard/surveys/questions-edit'));

const SchoolListPage = lazy(() => import('src/pages/dashboard/schools/list'));
const SchoolCreatePage = lazy(() => import('src/pages/dashboard/schools/new'));
const SchoolEditPage = lazy(() => import('src/pages/dashboard/schools/edit'));

const StudentsListPage = lazy(() => import('src/pages/dashboard/students/list'));
const StudentsCreatePage = lazy(() => import('src/pages/dashboard/students/new'));
const StudentsEditPage = lazy(() => import('src/pages/dashboard/students/edit'));

const OnlineCategoriesListPage = lazy(() => import('src/pages/dashboard/onlinecategories/list'));
const OnlineCategoriesCreatePage = lazy(() => import('src/pages/dashboard/onlinecategories/new'));
const OnlineCategoriesEditPage = lazy(() => import('src/pages/dashboard/onlinecategories/edit'));

const OnlineStoreProductsEditPage = lazy(() => import('src/pages/dashboard/onlinestoreproducts/edit'));
const OnlineStoreProductsListPage = lazy(() => import('src/pages/dashboard/onlinestoreproducts/list'));
const OnlineStoreProductsCreatePage = lazy(() => import('src/pages/dashboard/onlinestoreproducts/new'));

const OnlineOrdersListPage = lazy(() => import('src/pages/dashboard/onlineorders/list'));
const OnlineOrdersCreatePage = lazy(() => import('src/pages/dashboard/onlineorders/new'));
const OnlineOrdersEditPage = lazy(() => import('src/pages/dashboard/onlineorders/edit'));

const WordListPage = lazy(()=> import('src/pages/dashboard/word/list'));
const WordCreatePage = lazy(() => import('src/pages/dashboard/word/new'));
const WordEditPage = lazy(()=> import('src/pages/dashboard/word/edit'));

const CompetitionListPage = lazy(()=> import('src/pages/dashboard/competition/list'));
const CompetitionCreatePage = lazy(()=> import('src/pages/dashboard/competition/new'));
const CompetitionEditPage = lazy(()=> import('src/pages/dashboard/competition/edit'));
const CompetitionWordsViewPage = lazy(()=> import('src/pages/dashboard/competition/words'));

const OfflineCourseListPage = lazy(() => import('src/pages/dashboard/offline-course/list'));
const OfflineCourseCreatePage = lazy(() => import('src/pages/dashboard/offline-course/new'));
const OfflineCourseEditPage = lazy(() => import('src/pages/dashboard/offline-course/edit'));

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

const OfflineCoursesListPage = lazy(() => import('src/pages/dashboard/offlinecourses/list'));
const OfflineCoursesCreatePage = lazy(() => import('src/pages/dashboard/offlinecourses/new'));
const OfflineCoursesEditPage = lazy(() => import('src/pages/dashboard/offlinecourses/edit'));


const ChaptersListPage = lazy(() => import('src/pages/dashboard/chapters/list'));
const ChaptersCreatePage = lazy(() => import('src/pages/dashboard/chapters/new'));
const ChaptersEditPage = lazy(() => import('src/pages/dashboard/chapters/edit'));

const McqsListPage = lazy(() => import('src/pages/dashboard/mcqs/list'));
const McqsCreatePage =  lazy(() => import('src/pages/dashboard/mcqs/new'));
const McqsEditPage = lazy(() => import('src/pages/dashboard/mcqs/edit'));

const DashboardListPage = lazy(() => import('src/pages/dashboard/dashboard/home-demo'));










const SurveyListPage = lazy(() => import('src/pages/dashboard/survey/list'));
const SurveyCreatePage = lazy(() => import('src/pages/dashboard/survey/new'));
const SurveyEditPage = lazy(() => import('src/pages/dashboard/survey/edit'));
const SurveyQuestionEditPage = lazy(() => import('src/pages/dashboard/survey/questions-edit'));
const ServeyQuestionsListPage = lazy(() => import('src/pages/dashboard/survey/questions'));
const SurveyQuestionsCreatePage = lazy(() => import('src/pages/dashboard/survey/questions-form'));

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
        path: 'survey',
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
          {
            path: ':surveyId/questions_new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveyQuestionsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/questions_edit/:questionId', // chnaged 
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveyQuestionEditPage />
              </PermissionBasedGuard>
            ),
          },
     
          {
            path: ':id/questions',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ServeyQuestionsListPage />
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

      // {
      //   path: 'banners',
      //   children: [
      //     {
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <BannersListPage />
      //         </PermissionBasedGuard>
      //       ),
      //       index: true,
      //     },
      //     {
      //       path: 'new',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <BannersCreatePage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //     {
      //       path: ':id/edit',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <BannersEditPage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //   ],
      // },

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
        path: 'listings',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ListingsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ListingsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ListingsEditPage />
              </PermissionBasedGuard>
            ),
          },
          // {
          //   path: ':id/view',
          //   element: (
          //     <PermissionBasedGuard hasContent permissions={['is_superuser']}>
          //       <AppointmentsViewPage />
          //     </PermissionBasedGuard>
          //   ),
          // },
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

      // {
      //   path: 'groups',
      //   children: [
      //     {
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <GroupsListPage />
      //         </PermissionBasedGuard>
      //       ),
      //       index: true,
      //     },
      //     {
      //       path: 'new',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <GroupsCreatePage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //     {
      //       path: ':id/edit',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <GroupsEditPage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //     {
      //       path: ':id/view',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <GroupsViewPage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //   ],
      // },

      // {
      //   path: 'forum_feeds',
      //   children: [
      //     {
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <ForumFeedsListPage />
      //         </PermissionBasedGuard>
      //       ),
      //       index: true,
      //     },
      //     {
      //       path: ':groupId/new',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <ForumFeedsCreatePage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //     {
      //       path: ':id/edit',
      //       element: (
      //         <PermissionBasedGuard hasContent permissions={['is_superuser']}>
      //           <ForumFeedsEditPage />
      //         </PermissionBasedGuard>
      //       ),
      //     },
      //   ],
      // },



      {
        path: 'groups',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GroupsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GroupsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GroupsEditPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/feeds',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <GroupsViewPage />
              </PermissionBasedGuard>
            ),
          },
  
          {
            path: ':id/feeds/new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ForumFeedsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/feeds/:feedId/edit', 
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ForumFeedsEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },



      {
        path: 'surveys',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveysListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveysCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveysEditPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/questions',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveysQuestionsViewPage />
              </PermissionBasedGuard>
            ),
          },
  
          {
            path: ':id/questions/new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveysQuestionsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/questions/:questionId/edit', 
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <SurveysQuestionsEditPage />
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
        path: 'onlinecategories',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineCategoriesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineCategoriesCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineCategoriesEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      
      {
        path: 'onlinestoreproducts',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineStoreProductsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineStoreProductsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineStoreProductsEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },


      {
        path: 'onlineorders',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineOrdersListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineOrdersCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OnlineOrdersEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },


      
      {
        path: 'word',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <WordListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <WordCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <WordEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'competition',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CompetitionListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CompetitionCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CompetitionEditPage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/competition_words',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <CompetitionWordsViewPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },


      {
        path: 'offlinecourse',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OfflineCourseListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OfflineCourseCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OfflineCourseEditPage />
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
            path: ':id/view',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <LessonVideoPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'onlinecourses',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OfflineCoursesListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OfflineCoursesCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <OfflineCoursesEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      
      {
        path: 'chapters',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ChaptersListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ChaptersCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <ChaptersEditPage />
              </PermissionBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'mcqs',
        children: [
          {
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <McqsListPage />
              </PermissionBasedGuard>
            ),
            index: true,
          },
          {
            path: 'new',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <McqsCreatePage />
              </PermissionBasedGuard>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <PermissionBasedGuard hasContent permissions={['is_superuser']}>
                <McqsEditPage />
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
