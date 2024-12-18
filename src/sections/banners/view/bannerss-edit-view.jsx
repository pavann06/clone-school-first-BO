// import PropTypes from 'prop-types';
// import { useQuery } from '@tanstack/react-query';

// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import request from 'src/api/request';

// import { useSettingsContext } from 'src/components/settings';
// import { LoadingScreen } from 'src/components/loading-screen';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannersNewEditForm from '../banners-new-edit-form';

// // ------------------------------------------------------------------------

// export default function BannersEditView({ id }) {
//   const settings = useSettingsContext();

//   const { data, isLoading } = useQuery({
//     queryKey: ['banners', id],
//     queryFn: () => request.get('/banners', { id }),
//     staleTime: 24 * 60 * 60 * 1000,
//   });

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="Edit"
//         links={[
//           { name: 'Dashboard', href: paths.dashboard.root },
//           {
//             name: 'Banners',
//             href: paths.dashboard.banners.root,
//           },
//           { name: data?.info?.[0]?.Banner_name },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />
//       {isLoading ? <LoadingScreen /> : <BannersNewEditForm currentBanner={data?.info?.[0]} />}
//     </Container>
//   );
// }

// BannersEditView.propTypes = {
//   id: PropTypes.string,
// };
