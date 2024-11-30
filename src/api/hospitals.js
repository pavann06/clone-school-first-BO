import request from 'src/api/request';

// ----------------------------------------------------------------------

export const CreateHospital = async (data) => {
  try {
    console.info('HOSPITAL-CREATE-FORM-DATA', data);

    // Check if there are images to upload
    if (data.logo && data.logo.length > 0) {
      const payload = {
        files: [...data.logo, ...data.hospital_images],
        entity: 'backoffice/hospitals',
      };

      // Uploading files
      const response = await request.UploadFiles(payload);
      const { success, info } = response;

      // If success then update data with uploaded image info
      if (success) {
        data.logo = info[0];
        data.hospital_images = info.slice(1);
      } else {
        // Files upload failed, return the response
        return response;
      }
    }
    // Create product without uploading images
    const resp = await request.post('backoffice/hospitals', data);
    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const UpdateHospital = async (data) => {
  try {
    console.log(data.logo,data.hospital_images)
    const new_logo_files = data.logo.filter((item) => typeof item === 'object');
    const old_logo_files = data.logo.filter((item) => typeof item === 'string');

    // uploading new files
    let response;
    // if new files then upload
    if (new_logo_files.length > 0) {
      const payload = {
        files: new_logo_files,
        entity: 'backoffice/hospitals',
      };
      response = await request.UploadFiles(payload);
      // if no new files then return success
    } else {
      response = { success: true, info: [...old_logo_files] };
    }
    // upload completed successfully
    const { success, info } = response;
    // if success then call create product api
    if (success) {
      data.logo = info[0];
    }

    // images

    const new_images_files = data.hospital_images.filter((item) => typeof item === 'object');
    const old_images_files = data.hospital_images.filter((item) => typeof item === 'string');

    // if new files then upload
    if (new_images_files.length > 0) {
      const payload = {
        files: new_images_files,
        entity: 'backoffice/hospitals',
      };
      response = await request.UploadFiles(payload);
      response.info = [...response.info, ...old_images_files];
      // if no new files then return success
    } else {
      response = { success: true, info: [...old_images_files] };
    }

    // if success then call create product api
    if (response.success) {
      data.hospital_images = [...response.info,];

      const resp = await request.put('backoffice/hospitals', data);
      return resp;
    }

    // files upload failed
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
