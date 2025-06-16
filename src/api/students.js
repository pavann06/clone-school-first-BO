import request from 'src/api/request';

// ----------------------------------------------------------------------

export const CreateStudent = async (form_data) => {
  try {
    console.info('FEED-CREATE-FORM-DATA', form_data);

    const resp = await request.post('backoffice/upload/student', form_data);

    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export const UpdateStudent = async (form_data) => {
//   try {
//     console.info('FEED-CREATE-FORM-DATA', form_data);

//     // if any key is blank, replace it with null
//     Object.keys(form_data).forEach((key) => {
//       if (form_data[key] === '') {
//         form_data[key] = null;
//       }
//     });

//     const resp = await request.put(`backoffice/student/${form_data.id}`, form_data);

//     return resp.data;
//   } catch (error) {
//     console.error(error);
//   }
//   return null;
// };
export const UpdateStudent = async (form_data) => {
  try {
    Object.keys(form_data).forEach((key) => {
      if (form_data[key] === '') {
        form_data[key] = null;
      }
    });

    const resp = await request.put(`backoffice/student/${form_data.id}`, form_data);
    return resp; // Return full response instead of just `resp.data`
  } catch (error) {
    console.error(error);
    return null;
  }
};
