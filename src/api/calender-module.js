import request from 'src/api/request';

// ----------------------------------------------------------------------

// export const CreateCalender = async (data) => {
//   try {
//     console.info('FEATURE-CREATE-FORM-DATA', data);

//     if (data.image) {
//       const formData = new FormData();
//       formData.append('files', data.image);
//       // formData.append('entity', 'edutain/feeds/');

//       const imageResponse = await request.UploadFiles(formData);

//       console.log('UPLOAD RESPONSE:', imageResponse);

//       if (imageResponse.success) {
//         data.image = imageResponse.info[0];
//       } else {
//         console.error('IMAGE UPLOAD FAILED:', imageResponse);
//         return imageResponse;
//       }
//     }

//     console.log('FINAL PAYLOAD:', data);

//     const response = await request.post('backoffice/broadcast/calendar', data);
//     console.info('FEATURE-CREATE-FORM-DATA', data);
//     return response;
//   } catch (error) {
//     console.error('API ERROR:', error);
//     return null;
//   }
// };

export const CreateCalender = async (form_data) => {
  try {
    console.info('PRODUCT-CREATE-FORM-DATA', form_data);

    // Check if there are images to upload
    if (form_data.image) {
      const payload = {
        files: form_data.image,
        module: 'calender',
      };

      // Uploading files
      const response = await request.UploadFiles(payload);
      const { success, data } = response;

      // If success then update data with uploaded image info
      if (success) {
        form_data.image = data[0].file_url;
      } else {
        // Files upload failed, return the response
        return response;
      }
    }
    // Create product without uploading images
    const resp = await request.post('backoffice/broadcast/calendar', form_data);
    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const UpdateCalender = async (data) => {
  try {
    const new_files = data.image.filter((item) => typeof item === 'object');
    const old_files = data.image.filter((item) => typeof item === 'string');

    // uploading new files
    let response;
    // if new files then upload
    if (new_files.length > 0) {
      const payload = {
        files: new_files,
        entity: 'feature',
      };
      response = await request.UploadFiles(payload);
      // if no new files then return success
    } else {
      response = { success: true, info: [...old_files] };
    }
    // upload completed successfully
    const { success, info } = response;
    // if success then call create product api
    if (success) {
      data.logo = info[0];

      const resp = await request.put('features', data);
      return resp;
    }
    // files upload failed
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

// if (data.video) {
//   const videoPayload = {
//     files: data.video,
//     entity: 'edutain/feeds/',
//   };
//   const videoResponse = await request.UploadFiles(videoPayload);

//   if (videoResponse.success) {
//     data.video = videoResponse.info[0];
//   } else {
//     return videoResponse;
//   }
// }
