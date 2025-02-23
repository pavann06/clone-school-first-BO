import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveysQuestionsNewEditForm from '../surveys-questions-new-edit-form';

// ------------------------------------------------------------------------

export default function SurveysQuestionsEditView({ questionId }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', questionId],
    queryFn: () => request.get(`backoffice/forum/feeds/${questionId}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'forum Feeds',
            href: paths.dashboard.groups.root,
          },
          { name: data?.data?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <SurveysQuestionsNewEditForm currentFeed={data?.data}  />}
    </Container>
  );
}

SurveysQuestionsEditView.propTypes = {
    questionId: PropTypes.string,
  
};
