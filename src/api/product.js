import request from 'src/api/request';

// ----------------------------------------------------------------------


export const CreateProduct = async (data) => {
  try {
    console.info('PRODUCT-CREATE-FORM-DATA', data);

    // Check if there are images to upload
    if (data.images && data.images.length > 0) {
      const payload = {
        files: data.images,
        entity: 'products',
      };
      
      // Uploading files
      const response = await request.UploadFiles(payload);
      const { success, info } = response;

      // If success then update data with uploaded image info
      if (success) {
        data.images = info;
      } else {
        // Files upload failed, return the response
        return response;
      }
    }
    // Create product without uploading images
    const resp = await request.post('products', data);
    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const UpdateProduct = async (data) => {
  try {
    const new_files = data.images.filter((item) => typeof item === 'object');
    const old_files = data.images.filter((item) => typeof item === 'string');

    // uploading new files
    let response;
    // if new files then upload
    if (new_files.length > 0) {
      const payload = {
        files: new_files,
        entity: 'products',
      };
      response = await request.UploadFiles(payload);
      // if no new files then return success
    } else {
      response = { success: true, info: [] };
    }
    // upload completed successfully
    const { success, info } = response;
    // if success then call create product api
    if (success) {
      data.images = old_files.concat(info);
      const resp = await request.put('products', data);
      return resp;
    }
    // files upload failed
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
