// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannersNewEditForm from '../banners-new-edit-form';

// // ----------------------------------------------------------------------

// export default function BannersCreateView() {
//   const settings = useSettingsContext();

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="Create a new Banner"
//         links={[
//           {
//             name: 'Dashboard',
//             href: paths.dashboard.root,
//           },
//           {
//             name: 'Banners',
//             href: paths.dashboard.banners.root,
//           },
//           { name: 'New Banner' },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />

//       <BannersNewEditForm />
//     </Container>
//   );
// }
