import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';

import { useRouter } from 'src/routes/hooks';
import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { CreateFeel, UpdateFeel } from 'src/api/feels';

export default function FeelsNewEditForm({ currentNews }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const NewsSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    likes_count: Yup.number().min(0, 'Must be non-negative').required('Likes count is required'),
    share_count: Yup.number().min(0, 'Must be non-negative').required('Share count is required'),
    views_count: Yup.number().min(0, 'Must be non-negative').required('Views count is required'),
    score: Yup.number().min(0, 'Must be non-negative').required('Score is required'),
    video: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentNews?.title || '',
      description: currentNews?.description || '',
      likes_count: currentNews?.likes_count || 0,
      share_count: currentNews?.share_count || 0,
      views_count: currentNews?.views_count || 0,
      score: currentNews?.score || 0,
      video: currentNews?.video || '',
    }),
    [currentNews]
  );

  const methods = useForm({
    resolver: yupResolver(NewsSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };
      const response = currentNews
        ? await UpdateFeel({ ...payload, id: currentNews.id })
        : await CreateFeel(payload);

      if (response?.success) {
        enqueueSnackbar(currentNews ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push('/dashboard/feels');
        reset();
        return response;
      }

      const errors = response?.response?.data?.data;
      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          methods.setError?.(field, { type: 'server', message: messages[0] });
        });
        enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
        return null;
      }

      enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      return response;
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return null;
    }
  });

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const payload = { files: file };
      const response = await request.UploadFiles(payload);
      if (response.success) return response.data[0].file_url;
      throw new Error('Upload failed');
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [enqueueSnackbar]);

  const handleVideoUpload = useCallback(async (file) => {
    const uploadedUrl = await handleUpload(file);
    if (uploadedUrl) {
      setValue('video', uploadedUrl);
      enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
    }
  }, [handleUpload, setValue, enqueueSnackbar]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="description" label="Description" multiline rows={3} />
              <RHFTextField name="likes_count" label="Likes Count" type="number" />
              <RHFTextField name="share_count" label="Share Count" type="number" />
              <RHFTextField name="views_count" label="Views Count" type="number" />
              <RHFTextField name="score" label="Score" type="number" />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Video</Typography>
                <RHFUpload
                  name="video"
                  label="Video"
                  onDrop={(files) => handleVideoUpload(files[0])}
                  isLoading={isUploading}
                  accept="video/*"
                />
                {values.video && (
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <video src={values.video} width="100" controls style={{ borderRadius: 8 }}>
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      onClick={() => setValue('video', '')}
                    >
                      ❌
                    </Box>
                  </Box>
                )}
              </Stack>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                {currentNews ? 'Save Changes' : 'Create Feel'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

FeelsNewEditForm.propTypes = {
  currentNews: PropTypes.object,
};
