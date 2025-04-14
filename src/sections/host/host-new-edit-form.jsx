import * as Yup from 'yup';
// Import date-fns for formatting
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState, useCallback } from 'react';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';
import { CreateHost , UpdateHost } from 'src/api/host';

import { useSnackbar } from 'src/components/snackbar';
// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { name } from 'dayjs/locale/en-gb';

// ----------------------------------------------------------------------

export default function HostNewEditForm({ currentCalender }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  // Validation Schema for the form
  const CalenderSchema = Yup.object().shape({
    name: Yup.string().required('Date is required'),
    about_host: Yup.string().required('This  is required'),
    about_host_full: Yup.string().required('Benefit is required'),
    qualification : Yup.string().required("This is required"),
    experience : Yup.string().required("This is required"),
   
    email: Yup.string().required('email is required'),
    image: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCalender?.name || '',
      about_host: currentCalender?.about_host || '',
      about_host_full: currentCalender?.about_host_full || '',
      experience: currentCalender?.experience || '',
      qualification: currentCalender?.qualification || '',
      email: currentCalender?.email || '',
      image: currentCalender?.image || '',
    }),
    [currentCalender]
  );

  const methods = useForm({
    resolver: yupResolver(CalenderSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {

      const payload = {
        ...data,
        image: data.image || null,
     
      };
      
    

      const response = currentCalender
        ? await UpdateHost({ ...payload, id: currentCalender.id })
        : await CreateHost(payload);

      if (response?.success) {
        enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
        router.push(paths.dashboard.host.root);
        reset();
        return response;
      }
      const errors = response?.response?.data?.data;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          if (methods.setError) {
            methods.setError(field, {
              type: 'server',
              message: messages[0],
            });
          }
        });
        enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
        return null;
      }

      enqueueSnackbar('Operation failed');
      return response;
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Operation failed');
      return null;
    }
  });

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const payload = {
          files: file,
        };
        const response = await request.UploadFiles(payload);

        if (response.success) {
          return response.data[0].file_url;
        }
        throw new Error('Upload failed');
      } catch (error) {
        enqueueSnackbar('File upload failed', { variant: 'error' });
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [enqueueSnackbar]
  );

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setValue('image', fileWithPreview);

        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('image', uploadedUrl);
          enqueueSnackbar('Image uploaded successfully');
        }
      }
    },
    [setValue, enqueueSnackbar, handleUpload]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('image', null); // Remove the image
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('image', null); // Reset to no image
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
             
                

                <RHFTextField name="name" label="Name" />
                <RHFTextField name="about_host" label="About Host" />
                <RHFTextField name="about_host_full" label="About Host FullL" multiline rows={4} />
                <RHFTextField name="qualification" label="Qualification" />
                <RHFTextField name="experience" label="Experience" />
                <RHFTextField name="email" label="Email" />
              

           
             
              
              <Box>
                  {/* <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Image</Typography>
                    <RHFUpload
                      thumbnail
                      name="image"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      isLoading={isUploading}
                    />
                  </Stack> */}
                   <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Image</Typography>
                      <RHFUpload
                        thumbnail
                        name="image"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        isLoading={isUploading}
                      />
                    </Stack>
                </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentCalender ? 'Create Host' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

HostNewEditForm.propTypes = {
  currentCalender: PropTypes.any,
};
