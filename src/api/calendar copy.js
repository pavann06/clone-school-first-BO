import request from 'src/api/request';

// ----------------------------------------------------------------------


// export const CreateCalender = async (form_data) => {
//   try {
//     console.info('PRODUCT-CREATE-FORM-DATA', form_data);

//     // Check if there are images to upload
//     if (form_data.image) {
//       const payload = {
//         files: form_data.image,
//         module: 'calender',
//       };

//       // Uploading files
//       const response = await request.UploadFiles(payload);
//       const { success, data } = response;

//       // If success then update data with uploaded image info
//       if (success) {
//         form_data.image = data[0].file_url;
//       } else {
//         // Files upload failed, return the response
//         return response;
//       }
//     }
//     // Create product without uploading images
//     const resp = await request.post('backoffice/broadcast/calendar', form_data);
//     return resp;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const CreateCalender1 = async (form_data) => {
  try {
    console.info('FEED-CREATE-FORM-DATA', form_data);

    const resp = await request.post('backoffice/calendar', form_data);

    return resp;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




export const UpdateCalender1 = async (form_data) => {
  try {
    console.info('FEED-CREATE-FORM-DATA', form_data);

    // if any key is blank, replace it with null
    Object.keys(form_data).forEach((key) => {
      if (form_data[key] === '') {
        form_data[key] = null;
      }
    });

    const resp = await request.put(`backoffice/calendar/${form_data.id}`, form_data);

    return resp;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


