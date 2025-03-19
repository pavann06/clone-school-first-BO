// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// // import { useMemo, useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useMemo, useState, useCallback } from 'react'; // Combined import

// import { useSnackbar } from 'notistack';

// // UI Components (Material-UI)
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import { MenuItem } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// // Internal Utilities
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { useResponsive } from 'src/hooks/use-responsive';

// import request from 'src/api/request';
// import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';

// // API and Services

// // Form Components
// import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';




// // ----------------------------------------------------------------------

// export default function OnlineCategoriesNewEditForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     feed_type: Yup.string().required('Type is required'),
//     heading: Yup.string().required('Heading is required'),
//     image: Yup.mixed(),
//     video: Yup.mixed(),
//     youtube_video: Yup.mixed(),
//     duration: Yup.string(),
//     status: Yup.string(),
//     language: Yup.string().required('Language is required'),
//     description: Yup.string().required('Description is required'),
//     school_ids: Yup.array().of(Yup.string()).min(1, 'At least one school is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       heading: currentEdutainment?.heading || '',
//       feed_type: currentEdutainment?.feed_type || '',
//       image: currentEdutainment?.image || '',
//       video: currentEdutainment?.video || '',
//       youtube_video: currentEdutainment?.youtube_video || '',
//       duration: currentEdutainment?.duration || 0,
//       language: currentEdutainment?.language || '',
//       description: currentEdutainment?.description || '',
//       school_ids: currentEdutainment?.school_ids || [],
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
//     try {
//       const payload = {
//         ...data,
//         // school_ids: data.school_ids || [],
//         image: data.image || null,
//         video: data.video || null,
//         youtube_video: data.youtube_video || null,
//       };
//       if (!currentEdutainment) {
//         payload.status = 'Pending';
//       }

//       const response = currentEdutainment
//         ? await UpdateEdutainment({ ...payload, id: currentEdutainment.id })
//         : await CreateEdutainment(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.edutainment.root);
//         reset();
//         return response;
//       }

//       // Display API error message in a red toast
//       const errorMessage = response?.error || 'Operation failed';
//       enqueueSnackbar(errorMessage, { variant: 'error' });
//       return response;
//     } catch (error) {
//       // Handle unexpected errors (e.g., network issues)
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
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

//         // Check file type (image or video) and set the corresponding value
//         if (file.type.startsWith('image/')) {
//           setValue('image', fileWithPreview);
//           const uploadedUrl = await handleUpload(file);
//           if (uploadedUrl) {
//             setValue('image', uploadedUrl);
//             enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
//           }
//         } else if (file.type.startsWith('video/')) {
//           setValue('video', fileWithPreview);
//           const uploadedUrl = await handleUpload(file);
//           if (uploadedUrl) {
//             setValue('video', uploadedUrl);
//             enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
//           }
//         } else {
//           enqueueSnackbar('Unsupported file type', { variant: 'error' });
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
//                   <RHFSelect name="feed_type" label="Type">
//                     <MenuItem value="Text">Text</MenuItem>
//                     <MenuItem value="Image">Image</MenuItem>
//                     <MenuItem value="Video">Video</MenuItem>
//                     <MenuItem value="Youtube video">YouTube</MenuItem>
//                   </RHFSelect>

//                   {currentEdutainment && (
//                     <RHFSelect name="status" label="Status">
//                       <MenuItem value="Approved">Approved</MenuItem>
//                       <MenuItem value="Rejected">Rejected</MenuItem>
//                       <MenuItem value="Pending">Pending</MenuItem>
//                     </RHFSelect>
//                   )}
//                 </Box>

//                 {/* Language, Heading, Description */}
//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <Stack spacing={2}>
//                     <RHFSelect name="language" label="Language">
//                       <MenuItem value="Telugu">Telugu</MenuItem>
//                       <MenuItem value="Hindi">Hindi</MenuItem>
//                       <MenuItem value="English">English</MenuItem>
//                     </RHFSelect>
//                     <RHFTextField name="heading" label="Heading" />
//                     <RHFTextField name="description" label="Description" multiline rows={4} />
//                   </Stack>
//                 </Box>

        

//                 {/* Conditionally Render Image Field */}
//                 {(values.feed_type === 'Image' ||
//                   values.feed_type === 'Video' ||
//                   values.feed_type === 'Youtube video') && (
//                   <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                     {/* Image Field */}
//                     <Stack spacing={1.5}>
//                       <Typography variant="subtitle2">Image</Typography>
//                       <RHFUpload
//                         thumbnail
//                         name="image"
//                         maxSize={3145728}
//                         onDrop={handleDrop}
//                         onRemove={handleRemoveFile}
//                         onRemoveAll={handleRemoveAllFiles}
//                         isLoading={isUploading}
//                       />
//                     </Stack>
//                   </Box>
//                 )}

//                 {values.feed_type === 'Video' && (
//                   <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                     {/* Video Field */}
//                     <Stack spacing={1.5}>
//                       <Typography variant="subtitle2">Video</Typography>
//                       <RHFUpload
//                         thumbnail
//                         name="video"
//                         maxSize={3145728} // Adjust the max size as per your requirement
//                         onDrop={handleDrop}
//                         onRemove={handleRemoveFile}
//                         onRemoveAll={handleRemoveAllFiles}
//                         isLoading={isUploading}
//                         accept="video/*" // Allows only video files
//                       />
//                     </Stack>
//                   </Box>
//                 )}

//                 {values.feed_type === 'Youtube video' && (
//                   <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                     <Stack spacing={1.5}>
//                       <Typography variant="subtitle2">Youtube Video</Typography>
//                       <RHFTextField name="youtube_video" label="Video URL or ID" />
//                     </Stack>
//                   </Box>
//                 )}

//                 {values.feed_type === 'Video' && (
//                   <Box>
//                     <RHFTextField
//                       name="duration"
//                       label="Duration (in seconds)"
//                       type="number"
//                       InputProps={{ inputProps: { min: 0 } }} // Restrict to non-negative values
//                     />
//                   </Box>
//                 )}
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
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

// OnlineCategoriesNewEditForm.propTypes = {
//   currentEdutainment: PropTypes.any,
// };


import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import request from 'src/api/request';

import { CreateStoreCategory, UpdateStoreCategory } from 'src/api/edutainment';

// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

export default function OnlineCategoriesNewEditForm({ currentCategory }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const CategorySchema = Yup.object().shape({
    category_name: Yup.string().required('Category Name is required'),
    thumbnail_image: Yup.mixed(),
    icon: Yup.mixed(),
    is_active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      category_name: currentCategory?.category_name || '',
      thumbnail_image: currentCategory?.thumbnail_image || '',
      icon: currentCategory?.icon || '',
      is_active: currentCategory?.is_active ?? true,
    }),
    [currentCategory]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const { reset, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };
      const response = currentCategory
        ? await UpdateStoreCategory({ ...payload, id: currentCategory.id })
        : await CreateStoreCategory(payload);

      if (response?.success) {
        enqueueSnackbar(currentCategory ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.onlinecategories.root);
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const response = await request.UploadFiles({ files: file });
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
  }, [enqueueSnackbar]);

  const handleDrop = useCallback(async (acceptedFiles, field) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue(field, file);
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue(field, uploadedUrl);
        enqueueSnackbar(`${field.replace('_', ' ')} uploaded successfully`, { variant: 'success' });
      }
    }
  }, [setValue, enqueueSnackbar, handleUpload]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {/* <CardHeader title={currentCategory ? 'Edit Category' : 'Create Category'} /> */}
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="category_name" label="Category Name" />

              <Box>
                <Typography variant="subtitle2">Thumbnail Image</Typography>
                <RHFUpload
                  name="thumbnail_image"
                  maxSize={10485760}
                  onDrop={(files) => handleDrop(files, 'thumbnail_image')}
                  isLoading={isUploading}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2">Icon</Typography>
                <RHFUpload
                  name="icon"
                  maxSize={10485760}
                  onDrop={(files) => handleDrop(files, 'icon')}
                  isLoading={isUploading}
                />
              </Box>

              <FormControlLabel
                control={<Switch {...methods.register('is_active')} defaultChecked />}
                label="Active"
              />

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                {currentCategory ? 'Save Changes' : 'Create Category'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

OnlineCategoriesNewEditForm.propTypes = {
  currentCategory: PropTypes.any,
};
