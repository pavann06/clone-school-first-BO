// import PropTypes from 'prop-types';
// import { useQuery } from '@tanstack/react-query';

// import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import request from 'src/api/request';

// import { useSettingsContext } from 'src/components/settings';
// import { LoadingScreen } from 'src/components/loading-screen';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import SchoolNewEditForm from '../students-new-edit-form';

// // ------------------------------------------------------------------------

// export default function StudentsEditView({ id }) {
//   const settings = useSettingsContext();

//   const { data, isLoading } = useQuery({
//     queryKey: ['school', id],
//     queryFn: () => request.get(`backoffice/student/${id}`),
//   });

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <CustomBreadcrumbs
//         heading="Edit"
//         links={[
//           { name: 'Dashboard', href: paths.dashboard.root },
//           {
//             name: 'Schools',
//             href: paths.dashboard.students.root,
//           },
//           { name: data?.data?.heading },
//         ]}
//         sx={{
//           mb: { xs: 3, md: 5 },
//         }}
//       />
//       {isLoading ? <LoadingScreen /> : <SchoolNewEditForm currentStudent={data?.data} />}
//     </Container>
//   );
// }

// StudentsEditView.propTypes = {
//   id: PropTypes.string,
// };
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StudentsNewEditForm from '../students-new-edit-form';

// ------------------------------------------------------------------------

export default function StudentsEditView() {
  const { id } = useParams(); // ✅ fix: get ID from URL params
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: () => request.get(`backoffice/student/${id}`),
    enabled: !!id, // only run query when ID exists
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Students',
            href: paths.dashboard.students.root,
          },
          { name: data?.data?.name || 'Student' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <StudentsNewEditForm currentStudent={data?.data} />}
    </Container>
  );
}
