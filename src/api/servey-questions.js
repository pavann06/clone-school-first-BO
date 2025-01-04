import request from 'src/api/request';

// ----------------------------------------------------------------------

// export const CreateSurveyQuestion = async (form_data , survey_id) => {
//   try {
//     console.info('FEED-CREATE-FORM-DATA', form_data);

//     const resp = await request.post(`backoffice/survey/${survey_id}/question`, form_data);

//     return resp;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const UpdateSurveyQuestion = async (form_data) => {
//   try {
//     console.info('FEED-CREATE-FORM-DATA', form_data);

//     // if any key is blank, replace it with null
//     Object.keys(form_data).forEach((key) => {
//       if (form_data[key] === '') {
//         form_data[key] = null;
//       }
//     });

//     const resp = await request.put(`backoffice/edutain/feeds/${form_data.id}`, form_data);

//     return resp;
//   } catch (error) {
//     console.error(error);
//   }
//   return null;
// };




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
