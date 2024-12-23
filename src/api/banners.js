import request from 'src/api/request';

// ----------------------------------------------------------------------

export const CreateBanner = async (data) => {
  try {
    console.info('BANNER-CREATE-FORM-DATA', data);

    // Check if there are images to upload
    if (data.banner_image && data.banner_image.length > 0) {
      const payload = {
        files: data.banner_image,
        entity: 'banners',
      };

      // Uploading files
      const response = await request.UploadFiles(payload);
      const { success, info } = response;

      // If success then update data with uploaded image info
      if (success) {
        data.banner_image = info[0];
      } else {
        // Files upload failed, return the response
        return response;
      }
    }
    // Create product without uploading images
    const resp = await request.post('banners', data);
    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const UpdateBanner = async (data) => {
  try {
    const new_files = data.banner_image.filter((item) => typeof item === 'object');
    const old_files = data.banner_image.filter((item) => typeof item === 'string');

    // uploading new files
    let response;
    // if new files then upload
    if (new_files.length > 0) {
      const payload = {
        files: new_files,
        entity: 'banner',
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
      data.banner_image = info[0];

      const resp = await request.put('banners', data);
      return resp;
    }
    // files upload failed
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
