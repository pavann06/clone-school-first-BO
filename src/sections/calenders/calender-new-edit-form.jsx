import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CreateCalender, UpdateCalender } from 'src/api/calender-module';

import { useSnackbar } from 'src/components/snackbar';
// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CalenderNewEditForm({ currentCalender }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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
      image: typeof currentCalender?.image === 'string' ? currentCalender.image : '',
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
      // if update product
      let response = {};
      if (currentCalender) {
        data.id = currentCalender.id;
        response = await UpdateCalender(data);
      }
      // if create product
      else {
        response = await CreateCalender(data);
      }

      // product creation success
      if (response && response.success) {
        enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
        reset();
        // invalidate cache
        queryClient.invalidateQueries(['calender']);

        // redirect to product list
        router.push(paths.dashboard.calender.root);
        return response;
      }
      enqueueSnackbar('Calender Create failed!');

      return response;
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Feeds Create failed from user!');
    }
    return null;
  });

  // Handle file upload
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0]; // Allow only the first file
      if (newFile) {
        const fileWithPreview = Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });
        setValue('image', fileWithPreview, { shouldValidate: true }); // Set the single file
      }
    },
    [setValue]
  );

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
                  <RHFTextField
                    name="date"
                    label="date"
                    type="date"
                    InputProps={{
                      inputProps: {
                        min: '2020-01-01', // Optionally, set a minimum date
                      },
                    }}
                    InputLabelProps={{
                      shrink: true, // Ensures the label stays above the field even when not focused
                    }}
                  />
                </Box>

                <RHFTextField name="prompt" label="Prompt" />
                <RHFTextField name="benefit" label="Benefit" />
                <RHFTextField name="youtube_video_url" label="YouTube Video URL" />
                <RHFTextField name="description" label="Description" multiline rows={4} />
                <RHFUpload
                  name="image"
                  label="Upload Image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
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
