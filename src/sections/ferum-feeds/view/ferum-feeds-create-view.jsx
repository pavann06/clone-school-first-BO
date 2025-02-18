import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FerumFeedsNewEditForm from '../ferum-feeds-new-edit-form';

// ----------------------------------------------------------------------

export default function ForumFeedsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a  News"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'News',
            href: paths.dashboard.news.root,
          },
          { name: 'New Banner' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FerumFeedsNewEditForm />
    </Container>
  );
}


// import { useParams } from 'react-router-dom'; // To get the id from the URL
// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import FerumFeedsNewEditForm from '../ferum-feeds-new-edit-form';

// // ----------------------------------------------------------------------

// export default function ForumFeedsCreateView() {
//   const settings = useSettingsContext();
//   const {groupId, id } = useParams(); // Get the id from the URL

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading={id ? "Edit Feed" : "Create Feed"} // Conditional heading based on id
//         links={[
//           {
//             name: 'Dashboard',
//             href: paths.dashboard.root,
//           },
//           {
//             name: 'News',
//             href: paths.dashboard.forum_feeds.root,
//           },
//           { name: id ? 'Edit Feed' : 'New Feed' }, // Conditional breadcrumb text
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />

//       {/* Pass the id to the form */}
//       <FerumFeedsNewEditForm id={id} groupId={groupId} />
//     </Container>
//   );
// }
