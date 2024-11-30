// import PropTypes from 'prop-types';
// import {useQuery} from '@tanstack/react-query';

// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import request from 'src/api/request';

// import { useSettingsContext } from 'src/components/settings';
// import { LoadingScreen } from 'src/components/loading-screen';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import AppointmentsNewEditForm from '../appointments-new-edit-form';

// // ------------------------------------------------------------------------

// export default function AppointmentsEditView({ id }) {
//   const settings = useSettingsContext();

//   const { data, isLoading } = useQuery({
//     queryKey: ['appointments', id],
//     queryFn: () => request.get('/appointments', { id }),
//     staleTime: 24 * 60 * 60 * 1000,
//   });

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="Edit"
//         links={[
//           { name: 'Dashboard', href: paths.dashboard.root },
//           {
//             name: 'Features',
//             href: paths.dashboard.features.root,
//           },
//           // { name: data?.info?.[0]?.Feature_name },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />
//       {isLoading ? <LoadingScreen/> : <AppointmentsNewEditForm currentFeature={data?.info?.[0]} />}
//     </Container>
//   );
// }

// AppointmentsNewEditForm.propTypes = {
//   id: PropTypes.string,
// };
