import request from 'src/api/request';





// Create a Survey Question
export const CreateSurveyQuestion = async (form_data, surveyId) => {
  try {
    const response = await request.post(`/backoffice/survey/${surveyId}/question`, form_data);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { success: false, error: error.response?.data?.message || 'Create failed' };
  }
};

// Update a Survey Question
export const UpdateSurveyQuestion = async (form_data) => {
  try {
    const response = await request.put(`/backoffice/survey/question/${form_data.id}`, form_data);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { success: false, error: error.response?.data?.message || 'Update failed' };
  }
};
