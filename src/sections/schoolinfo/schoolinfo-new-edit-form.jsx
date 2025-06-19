import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';

import { Box, Card, Stack, Typography, Grid, MenuItem } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField, RHFUpload, RHFSelect } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import request from 'src/api/request';
import { CreateSchoolInfo, UpdateSchoolInfo } from 'src/api/school-info';
import SchoolsDropdown from './schools-dropdown';

export default function SchoolInfoNewEditForm({ currentSchool }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const SchoolSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    short_description: Yup.string().required('Short description is required'),
    long_description: Yup.string().required('Long description is required'),
    image: Yup.string().required('Image is required'),
    priority: Yup.number().required('Priority is required'),
    status: Yup.string().required('Status is required'),
    school: Yup.string().required('School is Required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentSchool?.title || '',
      short_description: currentSchool?.short_description || '',
      long_description: currentSchool?.long_description || '',
      image: currentSchool?.image || '',
      priority: currentSchool?.priority || '',
      status: currentSchool?.status || 'Active',
      School: currentSchool?.school || '',
    }),
    [currentSchool]
  );

  const methods = useForm({ resolver: yupResolver(SchoolSchema), defaultValues });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = currentSchool
        ? await UpdateSchoolInfo({ ...data, id: currentSchool.id })
        : await CreateSchoolInfo(data);

      if (response?.success) {
        enqueueSnackbar(currentSchool ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.school_info.root);
        reset();
      } else {
        const errors = response?.response?.data?.data;
        if (errors) {
          Object.entries(errors).forEach(([field, messages]) => {
            methods.setError(field, { type: 'server', message: messages[0] });
          });
          enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
        } else {
          enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const response = await request.UploadFiles({ files: file });
        if (response.success) {
          enqueueSnackbar('Image uploaded successfully!', { variant: 'success' });
          return response.data[0].file_url;
        }
        throw new Error('Upload failed');
      } catch {
        enqueueSnackbar('File upload failed', { variant: 'error' });
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [enqueueSnackbar]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} md={9}>
          <Card>
            <Stack spacing={3} sx={{ p: 4 }}>
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="short_description" label="Short Description" multiline rows={2} />
              <RHFTextField name="long_description" label="Long Description" multiline rows={4} />
              <RHFTextField name="priority" label="Priority" type="number" />

              <RHFSelect name="status" label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </RHFSelect>

              <Box>
                <Typography variant="subtitle2">Select School</Typography>
                <SchoolsDropdown
                  value={values.school}
                  onChange={(selected) => setValue('school', selected)}
                />
              </Box>

              <Box sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 2, p: 2 }}>
                <RHFUpload
                  name="image"
                  label="Upload Image"
                  onDrop={async (files) => {
                    const file = files[0];
                    if (file) {
                      setValue('image', file);
                      const uploadedUrl = await handleUpload(file);
                      if (uploadedUrl) {
                        setValue('image', uploadedUrl);
                      }
                    }
                  }}
                  isLoading={isUploading}
                />
              </Box>

              {values.image && typeof values.image === 'string' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Image Preview</Typography>
                  <Box
                    component="img"
                    src={values.image}
                    alt="Uploaded Image"
                    sx={{ height: 120, width: 'auto', borderRadius: 1, mt: 1 }}
                  />
                </Box>
              )}

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {currentSchool ? 'Save Changes' : 'Create School'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SchoolInfoNewEditForm.propTypes = {
  currentSchool: PropTypes.object,
};
