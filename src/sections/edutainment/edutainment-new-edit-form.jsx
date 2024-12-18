// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { useMemo } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useQueryClient } from '@tanstack/react-query';
// import React, { useState, useEffect, useCallback } from 'react'; // Combined import

// // UI Components (Material-UI)
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { MenuItem } from '@mui/material';

// // Internal Utilities
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { useSnackbar } from 'src/components/snackbar';

// // API and Services
// import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';

// // Form Components
// import FormProvider, { RHFUpload, RHFTextField, RHFSelect } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function EdutainmentNewEditForm({ currentEdutainment }) {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const EdutainmentSchema = Yup.object().shape({
//     heading: Yup.string().required('Name is required'),
//     image: Yup.mixed(),
//     video: Yup.mixed().when('type', {
//       is: 'video',
//       then: Yup.mixed().required('Video is required for video type'),
//     }),
//     duration: Yup.string().when('type', {
//       is: 'video',
//       then: Yup.string().required('Duration is required for video type'),
//     }),
//     language: Yup.string().required('Language is required'),

//     description: Yup.string().required('Description is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       heading: currentEdutainment?.heading || '',
//       type: currentEdutainment?.type || 'text', // Assuming 'text' is the default
//       image: currentEdutainment?.image || '',
//       video: currentEdutainment?.video || '',
//       duration: currentEdutainment?.duration || '',
//       language: currentEdutainment?.language || '',

//       description: currentEdutainment?.description || '',
//     }),
//     [currentEdutainment]
//   );

//   const methods = useForm({
//     resolver: yupResolver(EdutainmentSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const values = watch();

//   const onSubmit = handleSubmit(async (data) => {
//     console.info('Submitting Form Data:', data);

//     const formData = new FormData();
//   if (data.image) {
//     formData.append('image', data.image); // Ensure image is appended as file
//   }

//     let response = {};
//     if (currentEdutainment) {
//       data.id = currentEdutainment.id;
//       response = await UpdateEdutainment(data);
//     } else {
//       response = await CreateEdutainment(data);
//     }

//     console.info('API Response:', response);

//     const { success, description } = response || {};

//     if (success) {
//       enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!');
//       queryClient.invalidateQueries(['edutainments']);
//       router.push(paths.dashboard.edutainments.root);
//     } else {
//       enqueueSnackbar(description || 'Something went wrong');
//       reset();
//     }
//   });

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const newFile = acceptedFiles[0]; // Allow only the first file
//       if (newFile) {
//         const fileWithPreview = Object.assign(newFile, {
//           preview: URL.createObjectURL(newFile),
//         });
//         setValue('image', fileWithPreview, { shouldValidate: true }); // Set the single file
//       }
//     },
//     [setValue]
//   );

//   const handleRemoveFile = useCallback(() => {
//     setValue('image', null); // Remove the image
//   }, [setValue]);

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('image', null); // Reset to no image
//   }, [setValue]);

//   const handleVideoDrop = useCallback(
//     (acceptedFiles) => {
//       const newFile = acceptedFiles[0]; // Accept only the first video file
//       if (newFile) {
//         const fileWithPreview = Object.assign(newFile, {
//           preview: URL.createObjectURL(newFile), // Generate a preview URL
//         });
//         setValue('video', fileWithPreview, { shouldValidate: true }); // Set the single video
//       }
//     },
//     [setValue]
//   );

//   const handleRemoveVideo = useCallback(() => {
//     setValue('video', null); // Remove the video
//   }, [setValue]);

//   const handleRemoveAllVideos = useCallback(() => {
//     setValue('video', null); // Reset to no video
//   }, [setValue]);

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Properties" />}

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
//                 {/* Type Dropdown */}
//                 <Box
//                   columnGap={2}
//                   rowGap={3}
//                   display="grid"
//                   gridTemplateColumns={{
//                     xs: 'repeat(1, 1fr)', // Single column on small screens
//                     md: 'repeat(2, 1fr)', // Three columns on medium and up
//                   }}
//                 >
//                   <RHFSelect name="field_type" label="Type">
//                     <MenuItem value="text">Text</MenuItem>
//                     <MenuItem value="image">Image</MenuItem>
//                     <MenuItem value="video">Video</MenuItem>
//                     <MenuItem value="youtube">YouTube</MenuItem>
//                   </RHFSelect>
//                 </Box>

//                 {/* Language, Heading, Description */}
//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <Stack spacing={2}>
//                     {' '}
//                     {/* Adjust spacing as needed */}
//                     <RHFSelect name="language" label="Language">
//                       <MenuItem value="Telugu">Telugu</MenuItem>
//                       <MenuItem value="Hindi">Hindi</MenuItem>
//                       <MenuItem value="English">English</MenuItem>
//                     </RHFSelect>
//                     <RHFTextField name="heading" label="Heading" />
//                     <RHFTextField name="description" label="Description" />
//                   </Stack>
//                 </Box>

//                 {/* Conditionally Render Image Field */}
//                 {(values.field_type === 'image' ||
//                   values.field_type === 'video' ||
//                   values.field_type === 'youtube') && (
//                   <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                     {/* Image Field */}
//                     <Stack spacing={1.5}>
//                       <Typography variant="subtitle2">Image</Typography>
//                       {/* <RHFUpload
//                         thumbnail
//                         name="image"
//                         maxSize={3145728}
//                         onDrop={handleDrop}
//                         onRemove={handleRemoveFile}
//                         onRemoveAll={handleRemoveAllFiles}
//                       /> */}
//                       <RHFUpload
//   name="image"
//   maxSize={3145728} // 3MB in bytes
//   multiple={false} // Restrict to a single file
//   onDrop={handleDrop}
//   onRemove={handleRemoveFile}
// />
//                     </Stack>
//                   </Box>
//                 )}

//                 {(values.field_type === 'video' || values.field_type === 'youtube') && (
//                   <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                     <Stack spacing={1.5}>
//                       {/* <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                         <Stack spacing={1.5}>
//                           <Typography variant="subtitle2">Video</Typography>
//                           <RHFUpload
//                             name="video"
//                             maxSize={10485760}
//                             onDrop={handleVideoDrop}
//                             onRemove={handleRemoveVideo}
//                             onRemoveAll={handleRemoveAllVideos}
//                             accept="video/*"
//                           />
//                         </Stack>
//                       </Box> */}
//                       <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                         {/* Video Field */}
//                         <Stack spacing={1.5}>
//                           <Typography variant="subtitle2">Video</Typography>
//                           {/* <RHFUpload
//                             name="video"
//                             maxSize={10485760} // 10MB in bytes
//                             onDrop={handleVideoDrop}
//                             onRemove={handleRemoveVideo}
//                             onRemoveAll={handleRemoveAllVideos}
//                             accept="video/*"
//                           /> */}
//                              <RHFTextField
//                         name="video"
//                         label="Video"

//                       />
//                         </Stack>
//                       </Box>
//                     </Stack>

//                     <Box>
//                       {' '}
//                       <RHFTextField
//                         name="duration"
//                         label="Duration (in seconds)"
//                         type="number"
//                         InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
//                       />
//                     </Box>
//                   </Box>
//                 )}
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentEdutainment ? 'Create Edutainment' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// EdutainmentNewEditForm.propTypes = {
//   currentEdutainment: PropTypes.any,
// };
























import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import React, {  useMemo, useCallback  } from 'react'; // Combined import

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';


// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';
import { useSnackbar } from 'src/components/snackbar';

// API and Services


// Form Components
import FormProvider, { RHFUpload,RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EdutainmentNewEditForm({ currentEdutainment }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const EdutainmentSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is required'),
    image: Yup.string(),
    video: Yup.mixed().when('type', {
      is: 'video',
      then: Yup.mixed().required('Video is required for video type'),
    }),
    duration: Yup.string().when('type', {
      is: 'video',
      then: Yup.string().required('Duration is required for video type'),
    }),
    language: Yup.string().required('Language is required'),
    description: Yup.string().required('Description is required'),
    posting_date: Yup.string().required('posting_date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      heading: currentEdutainment?.heading || '',
      type: currentEdutainment?.type || 'text',
      image: currentEdutainment?.image || '',
      video: currentEdutainment?.video || '',
      duration: currentEdutainment?.duration || '',
      language: currentEdutainment?.language || '',
      description: currentEdutainment?.description || '',
      posting_date: currentEdutainment?.posting_date || '',
    }),
    [currentEdutainment]
  );

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
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
    console.info('Submitting Form Data:', data);

    const formData = new FormData();
    if (data.image) {
      formData.append('image', data.image); // Add the image as 'image' field in FormData
    }

    // Append other form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key !== 'image') {
        formData.append(key, data[key]);
      }
    });

    let response = {};
    if (currentEdutainment) {
      formData.append('id', currentEdutainment.id); // Append 'id' if updating an existing record
      response = await UpdateEdutainment(formData); // Send FormData for update
    } else {
      response = await CreateEdutainment(formData); // Send FormData for new creation
    }

    console.info('API Response:', response);

    const { success, description } = response || {};
    if (success) {
      enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!');
      queryClient.invalidateQueries(['edutainments']);
      router.push(paths.dashboard.edutainments.root);
    } else {
      enqueueSnackbar(description || 'Something went wrong');
      reset();
    }
  });

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
            {!mdUp && <CardHeader title="Properties" />}

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
                {/* Type Dropdown */}
                <Box
                  columnGap={2}
                  rowGap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)', // Single column on small screens
                    md: 'repeat(2, 1fr)', // Three columns on medium and up
                  }}
                >
                  <RHFSelect name="field_type" label="Type">
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="image">Image</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="youtube">YouTube</MenuItem>
                  </RHFSelect>
                </Box>

                {/* Language, Heading, Description */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={2}>
                    <RHFSelect name="language" label="Language">
                      <MenuItem value="Telugu">Telugu</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                    </RHFSelect>
                    <RHFTextField name="heading" label="Heading" />
                    <RHFTextField name="description" label="Description" />
                  </Stack>
                </Box>

                {/* Conditionally Render Image Field */}
                {(values.field_type === 'image' ||
                  values.field_type === 'video' ||
                  values.field_type === 'youtube') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    {/* Image Field */}
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Image</Typography>
                      <RHFUpload
                        thumbnail
                        name="image"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                      />
                    </Stack>
                  </Box>
                )}

                {(values.field_type === 'video' || values.field_type === 'youtube') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Video</Typography>
                      <RHFTextField name="video" label="Video URL or ID" />
                    </Stack>
                  </Box>
                )}

                {values.field_type === 'video' && (
                  <Box>
                    <RHFTextField
                      name="duration"
                      label="Duration (in seconds)"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
                    />
                  </Box>
                )}

                <Box>
                  <RHFTextField
                    name="posting_date"
                    label="posting_date"
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
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Edutainment' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

EdutainmentNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
