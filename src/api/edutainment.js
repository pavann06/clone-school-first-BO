import request from 'src/api/request';

// ----------------------------------------------------------------------

export const CreateEdutainment = async (data, authToken) => {
  console.info('CreateEdutainment Payload:', data);

  try {
    // Handle file uploads
    if (data.image && data.image.length > 0) {
      const payload = {
        files: data._image,
        entity: 'edutain/feeds/',
      };

      // Add Bearer token to the headers
      const fileUploadResponse = await request.UploadFiles(payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.info('File Upload Response:', fileUploadResponse);

      if (fileUploadResponse.success) {
        data.image = fileUploadResponse.info[0];
      } else {
        return fileUploadResponse;
      }
    }

    // Make API request with Bearer token
    const response = await request.post('edutain/feeds/', data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.info('Post API Response:', response);

    return response;
  } catch (error) {
    console.error('CreateEdutainment Error:', error);
    return { success: false, description: error.message };
  }
};


// export const CreateEdutainment = async (data) => {
//   try {
//     console.info('FEATURE-CREATE-FORM-DATA', data);

//     // Check if there are images to upload
//     if (data.logo && data.logo.length > 0) {
//       const payload = {
//         files: data.logo,
//         entity: 'edutain/feeds/',
//       };

//       // Uploading files
//       const response = await request.UploadFiles(payload);
//       const { success, info } = response;

//       // If success then update data with uploaded image info
//       if (success) {
//         data.logo = info[0];
//       } else {
//         // Files upload failed, return the response
//         return response;
//       }
//     }
//     // Create product without uploading images
//     const resp = await request.post('edutain/feeds/', data);
//     return resp;
    
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

  


export const UpdateEdutainment = async (data) => {
  try {

    const new_files = data.logo.filter((item) => typeof item === 'object');
    const old_files = data.logo.filter((item) => typeof item === 'string');

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
