// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useMemo, useState, useCallback } from 'react';
// import { useSnackbar } from 'notistack';

// // UI Components (Material-UI)
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import { MenuItem, Chip, TextField } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// // Internal Utilities
// import { useRouter } from 'src/routes/hooks';
// import { useResponsive } from 'src/hooks/use-responsive';
// import request from 'src/api/request';
// import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';
// import { CreateNews, UpdateNews } from 'src/api/news';
// import CategoriesDropdown from './news-categories';

// // Form Components 

// export default function NewsNewEditForm({ currentNews }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const [isUploading, setIsUploading] = useState(false);

//   const NewsSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     language: Yup.string().required('Language is required'),
//     categories: Yup.string().required('Categories is required'),
//     tags: Yup.string().required('Tags is required'),
//     target_groups: Yup.string().required('Target groups is required'),
//     images: Yup.mixed(),
//     videos: Yup.mixed(),
//     youtube_urls: Yup.string(),
//     remarks: Yup.string(),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       title: currentNews?.title || '',
//       language: currentNews?.language || '',
//       categories: currentNews?.categories || [],
//       tags: currentNews?.tags || [],
//       target_groups: currentNews?.target_groups || [],
//       images: currentNews?.images || [],
//       videos: currentNews?.videos || [],
//       youtube_urls: currentNews?.youtube_urls || '', // If it's an array, convert to a string
//       remarks: currentNews?.remarks || '', // Use an empty string instead of null
//     }),
//     [currentNews]
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewsSchema),
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
//         categories: data.categories.split(',').map((item) => item.trim()),
//         tags: data.tags.split(',').map((item) => item.trim()),
//         target_groups: data.target_groups.split(',').map((item) => item.trim()),
//         youtube_urls:
//           Array.isArray(data.youtube_urls) && data.youtube_urls.length > 0
//             ? data.youtube_urls.split(',').map((url) => url.trim())
//             : [],
//         images: data.images || [],
//         videos: data.videos || [],
//         remarks: data.remarks || null,
//       };

//       const response = currentNews
//         ? await UpdateNews({ ...payload, id: currentNews.id })
//         : await CreateNews(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentNews ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push('/dashboard/news');
//         reset();
//       } else {
//         enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
//     }
//   });

 
//   const handleUpload = useCallback(
//     async (file) => {
//       try {
//         setIsUploading(true);
//         const payload = { files: file };
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
//       try {
//         const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
//         const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

//         if (uploadedUrls.length > 0) {
//           setValue('images', [...values.images, ...uploadedUrls]);
//           enqueueSnackbar('Files uploaded successfully', { variant: 'success' });
//         }
//       } catch (error) {
//         enqueueSnackbar('Error uploading files', { variant: 'error' });
//       }
//     },
//     [handleUpload, setValue, values.images, enqueueSnackbar]
//   );



  

//   const handleVideoUpload = useCallback(
//     async (file) => {
//       const uploadedUrl = await handleUpload(file);
//       if (uploadedUrl) {
//         setValue('videos', [uploadedUrl]);
//         enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
//       }
//     },
//     [handleUpload, setValue, enqueueSnackbar]
//   );


//  ;
  

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <RHFTextField name="title" label="Title" />
//               <RHFSelect name="language" label="Language">
//                 <MenuItem value="Telugu">Telugu</MenuItem>
//                 <MenuItem value="Hindi">Hindi</MenuItem>
//                 <MenuItem value="English">English</MenuItem>
//               </RHFSelect>
//               <RHFTextField name="description" label="Description" multiline rows={4} />
//               {/* <RHFTextField name="categories" label="Categories" helperText="Comma-separated" /> */}

//               <Controller
//                 name="categories"
//                 control={methods.control}
//                 render={({ field }) => (
//                   <CategoriesDropdown
//                     {...field}
//                     value={field.value || []}
//                     onChange={(value) => field.onChange(value)}
//                   />
//                 )}
//               />

//               <RHFTextField name="tags" label="Tags" helperText="Comma-separated" />
//               {/* <RHFTextField name="target_groups" label="Target Groups" helperText="Comma-separated" /> */}
//               <RHFSelect name="target_groups" label="Target Groups">
//                 <MenuItem value="All">All</MenuItem>
//                 <MenuItem value="Youth">Youth</MenuItem>
//                 <MenuItem value="Parents">Parents</MenuItem>
//                 <MenuItem value="Single Parents">Single Parents</MenuItem>
//                 <MenuItem value="Grand Parents">Grand Parents</MenuItem>
//               </RHFSelect>

//               <Stack spacing={1.5}>
//                 <Typography variant="subtitle2">Images</Typography>
//                 <RHFUpload
//                   name="images"
//                   label="Images"
//                   multiple
//                   onDrop={handleDrop}
//                   isLoading={isUploading}
//                 />
//               </Stack>

//               <Stack spacing={1.5}>
//                 <Typography variant="subtitle2">Video</Typography>
//                 <RHFUpload
//                   name="videos"
//                   label="Video"
//                   onDrop={(files) => handleVideoUpload(files[0])}
//                   isLoading={isUploading}
//                   accept="video/*"
//                 />
//               </Stack>

//               <RHFTextField name="youtube_urls" label="YouTube URLs" helperText="Comma-separated" />
//               <RHFTextField name="remarks" label="Remarks" multiline rows={3} />

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//               >
//                 {currentNews ? 'Save Changes' : 'Create News'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// NewsNewEditForm.propTypes = {
//   currentNews: PropTypes.object,
// };

import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

// Material-UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Grid from '@mui/material/Unstable_Grid2';

// Internal Utilities
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { CreateNews, UpdateNews } from 'src/api/news';
import CategoriesDropdown from './news-categories';

export default function NewsNewEditForm({ currentNews }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const NewsSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    language: Yup.string().required('Language is required'),
    categories: Yup.array().required('Categories is required'),
    description : Yup.string().required("Description is required"),
    tags: Yup.string(),
    target_groups: Yup.string(),
    images: Yup.array().nullable(),
    videos: Yup.array().nullable(),
    youtube_urls: Yup.string(),
    remarks: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentNews?.title || '',
      language: currentNews?.language || '',
      description: currentNews?.description || "" ,
      categories: currentNews?.categories || [],
      tags: currentNews?.tags || '',
      target_groups: currentNews?.target_groups || '',
      images: currentNews?.images || [],
      videos: currentNews?.videos || [],
      youtube_urls: currentNews?.youtube_urls || '',
      remarks: currentNews?.remarks || '',
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
      const payload = {
        ...data,
        // Check if categories is an array, then map over it
        categories: Array.isArray(data.categories)
          ? data.categories.map((item) => item.trim())
          : data.categories.split(',').map((item) => item.trim()),
  
        // Similarly, check if tags and target_groups are arrays
        tags: Array.isArray(data.tags)
          ? data.tags.map((item) => item.trim())
          : data.tags.split(',').map((item) => item.trim()),
  
        target_groups: Array.isArray(data.target_groups)
          ? data.target_groups.map((item) => item.trim())
          : data.target_groups.split(',').map((item) => item.trim()),
  
        youtube_urls:
          Array.isArray(data.youtube_urls) && data.youtube_urls.length > 0
            ? data.youtube_urls.split(',').map((url) => url.trim())
            : [],
  
        images: data.images || [],
        videos: data.videos || [],
        remarks: data.remarks || null,
      };
  
      const response = currentNews
        ? await UpdateNews({ ...payload, id: currentNews.id })
        : await CreateNews(payload);
  
      if (response?.success) {
        enqueueSnackbar(currentNews ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push('/dashboard/news');
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });
  

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const payload = { files: file };
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
      try {
        const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
        const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

        if (uploadedUrls.length > 0) {
          setValue('images', [...values.images, ...uploadedUrls]);  // Make sure these are strings or objects
          enqueueSnackbar('Files uploaded successfully', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Error uploading files', { variant: 'error' });
      }
    },
    [handleUpload, setValue, values.images, enqueueSnackbar]
  );

  const handleVideoUpload = useCallback(
    async (file) => {
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue('videos', [uploadedUrl]);  // Ensure this is an array of strings or objects
        enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
      }
    },
    [handleUpload, setValue, enqueueSnackbar]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="title" label="Title" />
              <RHFSelect name="language" label="Language">
                <MenuItem value="Telugu">Telugu</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </RHFSelect>

              <RHFTextField name="tags" label="Tags" helperText="Comma-separated" />

              <Controller
                name="categories"
                control={methods.control}
                render={({ field }) => (
                  <CategoriesDropdown
                    {...field}
                    value={field.value || []}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />

              <RHFSelect name="target_groups" label="Target Groups">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Youth">Youth</MenuItem>
                <MenuItem value="Parents">Parents</MenuItem>
                <MenuItem value="Single Parents">Single Parents</MenuItem>
                <MenuItem value="Grand Parents">Grand Parents</MenuItem>
              </RHFSelect>

              <RHFTextField name="description" label = "Description " />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Images</Typography>
                <RHFUpload
                  name="images"
                  label="Images"
                  multiple
                  onDrop={handleDrop}
                  isLoading={isUploading}
                  currentFiles={values.images}  // Ensure this is an array of strings/objects
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Video</Typography>
                <RHFUpload
                  name="videos"
                  label="Video"
                  onDrop={(files) => handleVideoUpload(files[0])}
                  isLoading={isUploading}
                  accept="video/*"
                  currentFiles={values.videos}  // Ensure this is an array of strings/objects
                />
              </Stack>

              <RHFTextField name="youtube_urls" label="YouTube URLs" helperText="Comma-separated" />
              <RHFTextField name="remarks" label="Remarks" multiline rows={3} />

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                {currentNews ? 'Save Changes' : 'Create News'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

NewsNewEditForm.propTypes = {
  currentNews: PropTypes.object,
};
