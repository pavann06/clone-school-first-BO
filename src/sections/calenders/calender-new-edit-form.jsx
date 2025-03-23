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
import { CreateCalender, UpdateCalender } from 'src/api/calender-module';

import { useSnackbar } from 'src/components/snackbar';
// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CalenderNewEditForm({ currentCalender }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  // Validation Schema for the form
  const CalenderSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    prompt: Yup.string().required('Prompt is required'),
    benefit: Yup.string().required('Benefit is required'),
    youtube_video_url: Yup.string()
      .url('Must be a valid URL')
      .required('YouTube Video URL is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      date: currentCalender?.date || '',
      prompt: currentCalender?.prompt || '',
      benefit: currentCalender?.benefit || '',
      youtube_video_url: currentCalender?.youtube_video_url || '',
      description: currentCalender?.description || '',
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
        ? await UpdateCalender({ ...payload, id: currentCalender.id })
        : await CreateCalender(payload);

      if (response?.success) {
        enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
        router.push(paths.dashboard.calender.root);
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
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <Box>
                <RHFTextField name="date" label="Date" />
                </Box>

                <RHFTextField name="prompt" label="Prompt" />
                <RHFTextField name="benefit" label="Benefit" />
                <RHFTextField name="youtube_video_url" label="YouTube Video URL" />
              

           
              </Box>
              <Box>
              <RHFTextField name="description" label="Description" multiline rows={4} />
              </Box>
              <Box>
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
                {!currentCalender ? 'Create Calendar' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CalenderNewEditForm.propTypes = {
  currentCalender: PropTypes.any,
};
