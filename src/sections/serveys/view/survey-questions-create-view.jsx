import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';
import PropTypes from 'prop-types';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveyQuestionEditForm from '../survey-questions-edit-from';

// ----------------------------------------------------------------------------

export default function SurveyQuestionsCreateView({ surveyId }) {

  
  const settings = useSettingsContext();
                                                    
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a New Question"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Servey',
            href: paths.dashboard.survey.root,
          },
          { name: 'New Servey' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SurveyQuestionEditForm surveyId={surveyId}  />
    </Container>
  );
}

SurveyQuestionsCreateView.propTypes = {
  surveyId: PropTypes.string, // or PropTypes.number if surveyId is a number
};
