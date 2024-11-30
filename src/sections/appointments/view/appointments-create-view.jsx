// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import AppointmentsNewEditForm from '../appointments-new-edit-form';

// // ----------------------------------------------------------------------

// export default function AppointmentsCreateView() {
//   const settings = useSettingsContext();

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="Create a new Appointment"
//         links={[
//           {
//             name: 'Dashboard',
//             href: paths.dashboard.root,
//           },
//           {
//             name: 'Features',
//             href: paths.dashboard.appointments.root,
//           },
//           { name: 'New Appointment' },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />

//       <AppointmentsNewEditForm />
//     </Container>
//   );
// }
