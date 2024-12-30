// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import React, { useMemo, useState, useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useQueryClient } from '@tanstack/react-query';

// // UI Components (Material-UI)
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { DatePicker } from '@mui/x-date-pickers';

// // Internal Utilities
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import request from 'src/api/request';

// import { CreateCalender, UpdateCalender } from 'src/api/calender-module';

// import { useSnackbar } from 'src/components/snackbar';
// // Form Components
// import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
// import { Typography } from '@mui/material';

// // ----------------------------------------------------------------------

// export default function CalenderNewEditForm({ currentCalender }) {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const [isUploading, setIsUploading] = useState(false);

//   // Validation Schema for the form
//   const CalenderSchema = Yup.object().shape({
//     date: Yup.string().required('Date is required'),
//     prompt: Yup.string().required('Prompt is required'),
//     benefit: Yup.string().required('Benefit is required'),
//     youtube_video_url: Yup.string()
//       .url('Must be a valid URL')
//       .required('YouTube Video URL is required'),
//     description: Yup.string().required('Description is required'),
//     image: Yup.mixed(),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       date: currentCalender?.date || '',
//       prompt: currentCalender?.prompt || '',
//       benefit: currentCalender?.benefit || '',
//       youtube_video_url: currentCalender?.youtube_video_url || '',
//       description: currentCalender?.description || '',
//       image: currentCalender?.image || '',
//     }),
//     [currentCalender]
//   );

//   const methods = useForm({
//     resolver: yupResolver(CalenderSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const response = currentCalender
//         ? await UpdateCalender({ ...data, id: currentCalender.id })
//         : await CreateCalender(data);

//       if (response?.success) {
//         enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
//         router.push(paths.dashboard.calender.root);
//         reset();
//         return response;
//       }

//       enqueueSnackbar('Operation failed');
//       return response;
//     } catch (error) {
//       console.error('Error:', error);
//       enqueueSnackbar('Operation failed');
//       return null;
//     }
//   });

//   const handleUpload = useCallback(
//     async (file) => {
//       try {
//         setIsUploading(true);
//         const payload = {
//           files: file,
//         };
//         const response = await request.UploadFiles(payload);

//         if (response.success) {
//           return response.data[0].file_url;
//         }
//         throw new Error('Upload failed');
//       } catch (error) {
//         enqueueSnackbar('File upload failed', { variant: 'error' });
//         return null;
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [enqueueSnackbar]
//   );

//   const handleDrop = useCallback(
//     async (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         const fileWithPreview = Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         });
//         setValue('image', fileWithPreview);

//         const uploadedUrl = await handleUpload(file);
//         if (uploadedUrl) {
//           setValue('image', uploadedUrl);
//           enqueueSnackbar('Image uploaded successfully');
//         }
//       }
//     },
//     [setValue, enqueueSnackbar, handleUpload]
//   );

//   const handleRemoveFile = useCallback(() => {
//     setValue('image', null); // Remove the image
//   }, [setValue]);

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('image', null); // Reset to no image
//   }, [setValue]);

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <Box
//                 columnGap={2}
//                 rowGap={3}
//                 display="grid"
//                 gridTemplateColumns={{
//                   xs: 'repeat(1, 1fr)',
//                   md: 'repeat(2, 1fr)',
//                 }}
//               >
//                 <Box>
//                  <RHFTextField
//                     name="date"
//                     label="date"
                    
//                     type="date"
//                     InputProps={{
//                       inputProps: {
//                         min: '2020-01-01', 
//                       },
//                     }}
//                     InputLabelProps={{
//                       shrink: true, // Ensures the label stays above the field even when not focused
//                     }}
//                   /> 
                 
//                 </Box>

//                 <RHFTextField name="prompt" label="Prompt" />
//                 <RHFTextField name="benefit" label="Benefit" />
//                 <RHFTextField name="youtube_video_url" label="YouTube Video URL" />
//                 <RHFTextField name="description" label="Description" multiline rows={4} />

//                 <Box>
//                   <Stack spacing={1.5}>
//                     <Typography variant="subtitle2">Image</Typography>
//                     <RHFUpload
//                       thumbnail
//                       name="image"
//                       maxSize={3145728}
//                       onDrop={handleDrop}
//                       onRemove={handleRemoveFile}
//                       onRemoveAll={handleRemoveAllFiles}
//                       isLoading={isUploading}
//                     />
//                   </Stack>
//                 </Box>
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentCalender ? 'Create Calendar' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// CalenderNewEditForm.propTypes = {
//   currentCalender: PropTypes.any,
// };

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useMemo, useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';

import { CreateCalender, UpdateCalender } from 'src/api/calender-module';

import { useSnackbar } from 'src/components/snackbar';
// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { Typography } from '@mui/material';

// Import date-fns for formatting
import { format } from 'date-fns';

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
      // Format the date before submitting
      const formattedData = {
        ...data,
        date: format(new Date(data.date), 'dd-MM-yyyy'), // Format to DD-MM-YYYY
      };

      const response = currentCalender
        ? await UpdateCalender({ ...formattedData, id: currentCalender.id })
        : await CreateCalender(formattedData);

      if (response?.success) {
        enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
        router.push(paths.dashboard.calender.root);
        reset();
        return response;
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
