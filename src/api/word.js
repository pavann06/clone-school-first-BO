import request from 'src/api/request';

// ----------------------------------------------------------------------

export const CreateWord = async (form_data) => {
  try {
    console.info('FEED-CREATE-FORM-DATA', form_data);

    const resp = await request.post('backoffice/upload/words', form_data);

    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const UpdateWord = async (form_data) => {
  try {
    console.info('FEED-CREATE-FORM-DATA', form_data);

    // if any key is blank, replace it with null
    Object.keys(form_data).forEach((key) => {
      if (form_data[key] === '') {
        form_data[key] = null;
      }
    });

    const resp = await request.put(`backoffice/word/${form_data.id}`, form_data);

    return resp;
  } catch (error) {
    console.error(error);
  }
  return null;
};


