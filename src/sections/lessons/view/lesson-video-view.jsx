import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LessonsVideoForm from '../video-upload-form';

// ------------------------------------------------------------------------

export default function LessonsVideoView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', id],
    queryFn: () => request.get(`backoffice/lesson/${id}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
  
        <CustomBreadcrumbs
              heading="Edit"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                {
                  name: 'Lessons',
                  href: paths.dashboard.lessons.root,
                },
                { name: data?.data?.heading },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
      {isLoading ? <LoadingScreen /> : <LessonsVideoForm currentEdutainment={data?.data} />}
    </Container>
  );
}

LessonsVideoView.propTypes = {
  id: PropTypes.string,
};
