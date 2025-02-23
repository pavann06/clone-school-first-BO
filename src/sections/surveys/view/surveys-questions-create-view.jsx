import { useParams } from 'react-router-dom'; // To get the id from the URL
import Container from '@mui/material/Container';

import PropTypes from 'prop-types';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveysQuestionsNewEditForm from '../surveys-questions-new-edit-form';

export default function SurveysQuestionsCreateView({surveyId}) {
  console.log("Received groupId in ForumFeedsCreateView:", surveyId); // Debugging
  const settings = useSettingsContext();
  const { questionId } = useParams();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={questionId ? 'Edit Feed' : 'Create Feed'}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Feeds', href: paths.dashboard.groups.root },
          { name: questionId ? 'Edit Feed' : 'New Feed' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Pass the groupId to the form */}
      <SurveysQuestionsNewEditForm surveyId={surveyId} questionId={questionId} />

    </Container>
  );
}

SurveysQuestionsCreateView.propTypes = {
  // feedId: PropTypes.any, // Ensure groupId is a required string
  surveyId: PropTypes.any,
};
