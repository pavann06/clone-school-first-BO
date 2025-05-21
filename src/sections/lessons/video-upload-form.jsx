import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useCallback } from 'react';

import { useSnackbar } from 'notistack';

// UI
import {
  Box,
  Stack,
  Typography,
  Card,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import request from 'src/api/request';
import { CreateLesson, UpdateLesson } from 'src/api/lessons';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import OnlineCourseDropdown from './online-courses-dropdown';
import ChapterDropdown from './chapters-dropdown';

export default function LessonsVideoForm({ currentEdutainment }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    lesson_id: Yup.string().required('Lesson ID is required'),
    file_name: Yup.mixed().required('Video file is required'),
    file_type: Yup.string().required(),
    required_resolutions: Yup.array().of(Yup.string().required('Resolution is required')),
    course_id: Yup.string(),
    chapter_id: Yup.string(),
  });

  const defaultValues = {
    lesson_id: currentEdutainment?.lesson_id || '',
    file_name: currentEdutainment?.file_name || '',
    file_type: currentEdutainment?.file_type || '',
    required_resolutions: currentEdutainment?.required_resolutions || [''],
    course_id: currentEdutainment?.course_id || '',
    chapter_id: currentEdutainment?.chapter_id || '',
  };

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'required_resolutions',
  });

  const values = watch();

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const payload = { files: file };
      const response = await request.UploadFiles(payload);
      if (response.success) {
        const uploadedUrl = response.data[0].file_url;
        const fileType = file.type;
        setValue('file_name', uploadedUrl);
        setValue('file_type', fileType);
        enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
        return uploadedUrl;
      }
      throw new Error('Upload failed');
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [enqueueSnackbar, setValue]);

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      await handleUpload(fileWithPreview);
    } else {
      enqueueSnackbar('Please upload a valid video file', { variant: 'error' });
    }
  }, [handleUpload, enqueueSnackbar]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        file_name: data.file_name || null,
        file_type: data.file_type || null,
        required_resolutions: data.required_resolutions || [],
      };

      const response = currentEdutainment
        ? await UpdateLesson({ ...payload, id: currentEdutainment.id })
        : await CreateLesson(payload);

      if (response?.success) {
        enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.lessons.root);
        reset();
      } else {
        enqueueSnackbar('Operation failed', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="lesson_id" label="Lesson ID" />

              <RHFTextField name="file_type" label="File Type" disabled />

              <RHFTextField name="require_resolutions" label="Resolutuins" />
                  <RHFTextField name= "course_id" label="Course " />

     
              <RHFTextField name= "chapter_id" label="Chapter " />

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Lesson Video' : 'Update Lesson Video'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

LessonsVideoForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
