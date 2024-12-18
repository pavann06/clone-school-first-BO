// import PropTypes from 'prop-types';
// import {useQuery} from '@tanstack/react-query';

// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import request from 'src/api/request';

// import { useSettingsContext } from 'src/components/settings';
// import { LoadingScreen } from 'src/components/loading-screen';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import HospitalsNewEditForm from '../hospitals-new-edit-form';

// // ------------------------------------------------------------------------

// export default function HospitalsEditView({ id }) {
//   const settings = useSettingsContext();

//   const { data, isLoading } = useQuery({
//     queryKey: ['backoffice/hospitals', id],
//     queryFn: () => request.get('/backoffice/hospitals', { id }),
//     staleTime: 24 * 60 * 60 * 1000,
//   });

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="Edit"
//         links={[
//           { name: 'Dashboard', href: paths.dashboard.root },
//           {
//             name: 'Hospitals',
//             href: paths.dashboard.hospitals.root,
//           },
//           { name: data?.info?.[0]?.display_name },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />
//       {isLoading ? <LoadingScreen/> : <HospitalsNewEditForm currentHospital={data?.info?.[0]} />}
//     </Container>
//   );
// }

// HospitalsEditView.propTypes = {
//   id: PropTypes.string,
// };
