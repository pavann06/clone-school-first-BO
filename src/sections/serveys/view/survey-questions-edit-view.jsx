import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SurveyQuestionEditForm from '../survey-questions-edit-from';

// ------------------------------------------------------------------------

export default function SurveyQuestionEditView({ questionId ,id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['servey', questionId],
    queryFn: () => request.get(`backoffice/survey/question/${questionId}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Question',
            href: paths.dashboard.survey.root,
          },
          { name: data?.data?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <SurveyQuestionEditForm surveyId={id} questionId={questionId} currentQuestion={data?.data} />}
    </Container>
  );
}

SurveyQuestionEditView.propTypes = {
  id: PropTypes.string,
  questionId: PropTypes.string,
};
