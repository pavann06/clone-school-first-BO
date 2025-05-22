

// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm, Controller } from 'react-hook-form';
// import React, { useMemo, useState, useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useSnackbar } from 'notistack';

// // UI Components
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// import MenuItem from '@mui/material/MenuItem'; // For dropdown options

// // Internal
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { useResponsive } from 'src/hooks/use-responsive';

// import request from 'src/api/request';
// import FormProvider, { RHFUpload, RHFTextField, RHFSelect } from 'src/components/hook-form';
// import { CreateLesson, UpdateLesson } from 'src/api/lessons';

// export default function LessonsVideoForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();
//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     id: Yup.string(),
//     file_name: Yup.mixed(),
//     course_id: Yup.string(),
//     chapter_id: Yup.string(),
//     required_resolutions: Yup.array().of(Yup.string()),
//      file_type: Yup.string(),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       lesson_id: currentEdutainment?.id || '',
//       file_name: currentEdutainment?.file_name || '',
//       file_type: currentEdutainment?.file_type || '', // New
//       course_id: currentEdutainment?.course_id || '',
//       chapter_id: currentEdutainment?.chapter_id || '',
//       requires_resolutions: currentEdutainment?.requires_resolutions || [], // New
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
//         file_name: data.file_name || null,
//       };

//       if (!currentEdutainment) {
//         payload.status = 'Pending';
//       }

//       const response = currentEdutainment
//         ? await UpdateLesson({ ...payload, id: currentEdutainment.id })
//         : await CreateLesson(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.lessons.root);
//         reset();
//         return response;
//       }

//       const errors = response?.response?.data?.data;
//       if (errors) {
//         Object.entries(errors).forEach(([field, messages]) => {
//           if (methods.setError) {
//             methods.setError(field, {
//               type: 'server',
//               message: messages[0],
//             });
//           }
//         });
//         enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
//         return null;
//       }

//       enqueueSnackbar('Operation failed', { variant: 'error' });
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
//         const response = await request.UploadFiles({ files: file });

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
//   async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file && file.type.startsWith('video/')) {
//       const fileWithPreview = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       setValue('file_name', fileWithPreview);
//       setValue('file_type', file.type); // Set file_type here

//       const uploadedUrl = await handleUpload(file);
//       if (uploadedUrl) {
//         setValue('file_name', uploadedUrl); // Overwrite preview with URL
//         enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
//       }
//     } else {
//       enqueueSnackbar('Unsupported file type', { variant: 'error' });
//     }
//   },
//   [setValue, enqueueSnackbar, handleUpload]
// );


//   const handleRemoveFile = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('file_name', null);
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
//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <Stack spacing={2}>
//                     <RHFTextField name="lesson_id" label="Lesson" />
//                     <RHFTextField name="course_id" label="Course" />
//                     <RHFTextField name="chapter_id" label="Chapter" />
//                   </Stack>
//                 </Box>

//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <Stack spacing={1.5}>
//                     <Typography variant="subtitle2">Video</Typography>

//                     <RHFUpload
//                       thumbnail
//                       name="file_name"
//                       // maxSize={3145728} // 3MB
//                       onDrop={handleDrop}
//                       onRemove={handleRemoveFile}
//                       onRemoveAll={handleRemoveAllFiles}
//                       isLoading={isUploading}
//                       accept="video/*"
//                     />

//                     {/* Video Preview */}
//                     {typeof watch('video') === 'string' && watch('video').endsWith('.mp4') && (
//                       <Box sx={{ mt: 1 }}>
//                         {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
//                         <video
//                           src={watch('video')}
//                           controls
//                           style={{ borderRadius: 8, width: '50%', height: '10%' }}
//                         />
//                       </Box>
//                     )}
//                   </Stack>
//                 </Box>

//                 <RHFTextField name="file_type" label="File Type" disabled />


//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <RHFSelect
//                     fullWidth
//                     name="requires_resolutions"
//                     label="Required Resolutions"
//                     multiple
//                     native={false}
//                     SelectProps={{ multiple: true }}
//                   >
//                     {['360p', '480p', '720p', '1080p'].map((res) => (
//                       <MenuItem key={res} value={res}>
//                         {res}
//                       </MenuItem>
//                     ))}
//                   </RHFSelect>
//                 </Box>
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentEdutainment ? 'Create Lesson' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// LessonsVideoForm.propTypes = {
//   currentEdutainment: PropTypes.any,
// };

// second on e==================================================


// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import React, { useMemo, useState, useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useSnackbar } from 'notistack';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
// import LoadingButton from '@mui/lab/LoadingButton';
// import MenuItem from '@mui/material/MenuItem';

// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { useResponsive } from 'src/hooks/use-responsive';

// import request from 'src/api/request';
// import FormProvider, {
//   RHFUpload,
//   RHFTextField,
//   RHFSelect,
// } from 'src/components/hook-form';

// export default function LessonsVideoForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();
//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     lesson_id: Yup.string().required('Lesson ID is required'),
//     course_id: Yup.string().required('Course is required'),
//     chapter_id: Yup.string().required('Chapter is required'),
//     file_name: Yup.mixed().required('Video file is required'),
//     file_type: Yup.string().required('File type is required'),
//     requires_resolutions: Yup.array().of(Yup.string()),
//   });

//   const defaultValues = useMemo(() => ({
//     lesson_id: currentEdutainment?.lesson_id || '',
//     course_id: currentEdutainment?.course_id || '',
//     chapter_id: currentEdutainment?.chapter_id || '',
//     file_name: currentEdutainment?.file_name || '',
//     file_type: currentEdutainment?.file_type || '',
//     requires_resolutions: currentEdutainment?.requires_resolutions || [],
//   }), [currentEdutainment]);

//   const methods = useForm({
//     resolver: yupResolver(EdutainmentSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     setValue,
//     getValues,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const handleDrop = useCallback(
//     async (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       if (!file || !file.type.startsWith('video/')) {
//         enqueueSnackbar('Please upload a valid video file.', { variant: 'error' });
//         return;
//       }

//       const fileWithPreview = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       setValue('file_name', fileWithPreview);
//       setValue('file_type', file.type);

//       try {
//         setIsUploading(true);

//         const { lesson_id, course_id, chapter_id , required_resolutions} = getValues();

//         const uploadRes = await request.post('/courses/course-video-upload', {
//           lesson_id,
//           course_id,
//           chapter_id,
//           file_name: file.name,
//           file_type: file.type,
          
          
//         });

//         const { presigned_url, video_id } = uploadRes.data;

//         await fetch(presigned_url, {
//           method: 'PUT',
//           headers: { 'Content-Type': file.type },
//           body: file,
//         });

//         await request.post('/courses/course-video-convert', {
//           video_id,
//         });

//         setValue('lesson_id', video_id); // Use video_id as lesson_id
//         enqueueSnackbar('Video uploaded and sent for conversion.', { variant: 'success' });
//       } catch (error) {
//         console.error(error);
//         enqueueSnackbar('Upload or conversion failed.', { variant: 'error' });
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [setValue, getValues, enqueueSnackbar]
//   );

//   const handleRemoveFile = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = {
//         lesson_id: data.lesson_id,
//         course_id: data.course_id,
//         chapter_id: data.chapter_id,
//         file_type: data.file_type,
//         required_resolutions: data.requires_resolutions,
        
//       };

//       const res = await request.post('/your-api/lessons/create', payload);

//       if (res?.data?.success) {
//         enqueueSnackbar('Lesson created successfully!', { variant: 'success' });
//         router.push(paths.dashboard.lessons.root);
//         reset();
//       } else {
//         enqueueSnackbar('Lesson creation failed.', { variant: 'error' });
//       }
//     } catch (err) {
//       console.error(err);
//       enqueueSnackbar('Submission failed.', { variant: 'error' });
//     }
//   });

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Lesson Video Form" />}
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <Box
//                 display="grid"
//                 rowGap={3}
//                 columnGap={2}
//                 gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
//               >
//                 <RHFTextField name="lesson_id" label="Lesson ID" />
//                 <RHFTextField name="course_id" label="Course ID" />
//                 <RHFTextField name="chapter_id" label="Chapter ID" />
//                 <RHFTextField name="file_type" label="File Type" disabled />
//                 <RHFSelect
//                   name="requires_resolutions"
//                   label="Required Resolutions"
//                   multiple
//                   fullWidth
//                 >
//                   {['360p', '480p', '720p', '1080p'].map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </RHFSelect>
//               </Box>

//               <Stack spacing={1.5}>
//                 <Typography variant="subtitle2">Upload Video</Typography>
//                 <RHFUpload
//                   thumbnail
//                   name="file_name"
//                   onDrop={handleDrop}
//                   onRemove={handleRemoveFile}
//                   onRemoveAll={handleRemoveAllFiles}
//                   isLoading={isUploading}
//                   accept="video/*"
//                 />
//               </Stack>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//               >
//                 Submit Lesson
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// LessonsVideoForm.propTypes = {
//   currentEdutainment: PropTypes.object,
// };



// importnt one  ==============================================================================



// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import React, { useMemo, useState, useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useSnackbar } from 'notistack';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
// import LoadingButton from '@mui/lab/LoadingButton';
// import MenuItem from '@mui/material/MenuItem';

// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { useResponsive } from 'src/hooks/use-responsive';

// import request from 'src/api/request';
// import FormProvider, {
//   RHFUpload,
//   RHFTextField,
//   RHFSelect,
// } from 'src/components/hook-form';

// export default function LessonsVideoForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();
//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     lesson_id: Yup.string().required('Lesson ID is required'),
//     course_id: Yup.string().required('Course is required'),
//     chapter_id: Yup.string().required('Chapter is required'),
//     file_name: Yup.mixed().required('Video file is required'),
//     file_type: Yup.string().required('File type is required'),
//     required_resolutions: Yup.array().of(Yup.string()).min(1, 'Select at least one resolution'),
//   });

//   const defaultValues = useMemo(() => ({
//     lesson_id: currentEdutainment?.id || '',
//     course_id: currentEdutainment?.course_id || '',
//     chapter_id: currentEdutainment?.chapter_id || '',
//     file_name: currentEdutainment?.file_name || '',
//     file_type: currentEdutainment?.file_type || '',
//     required_resolutions: currentEdutainment?.required_resolutions || [],
//   }), [currentEdutainment]);

//   const methods = useForm({
//     resolver: yupResolver(EdutainmentSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     setValue,
//     getValues,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;






// const handleDrop = useCallback(
//   async (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     if (!file || !file.type.startsWith('video/')) {
//       enqueueSnackbar('Please upload a valid video file.', { variant: 'error' });
//       return;
//     }

//     const fileWithPreview = Object.assign(file, {
//       preview: URL.createObjectURL(file),
//     });

//     setValue('file_name', fileWithPreview);
//     setValue('file_type', file.type);

//     try {
//       setIsUploading(true);

//       const { lesson_id, course_id, chapter_id, required_resolutions } = getValues();

//       const resolutionsArray = Array.isArray(required_resolutions)
//         ? required_resolutions
//         : [required_resolutions].filter(Boolean);

//       const uploadPayload = {
//         lesson_id,
//         course_id,
//         chapter_id,
//         file_name: file.name,
//         file_type: file.type,
//         required_resolutions: resolutionsArray,
//       };

//       console.log('Payload to /courses/course-video-upload:', uploadPayload);

//       // 1) Call first API to get presigned URL and ID
//       const uploadRes = await request.post('/courses/course-video-upload', uploadPayload);

//       console.log('Response from /courses/course-video-upload:', uploadRes.data);

//       const { id, upload_url } = uploadRes.data;

//       // 2) Upload the file using the upload_url with PUT
//       await fetch(upload_url, {
//         method: 'PUT',
//         headers: { 'Content-Type': file.type },
//         body: file,
//       });

//       // 3) Send the 'id' to second API for video conversion
//       const convertPayload = { id };

//       console.log('Payload to /courses/course-video-convert:', convertPayload);

//       const convertRes = await request.post('/courses/course-video-convert', convertPayload);

//       console.log('Response from /courses/course-video-convert:', convertRes.data);

//       enqueueSnackbar('Video uploaded and conversion started.', { variant: 'success' });
//     } catch (error) {
//       console.error('Upload or conversion error:', error);
//       enqueueSnackbar('Upload failed.', { variant: 'error' });
//     } finally {
//       setIsUploading(false);
//     }
//   },
//   [setValue, getValues, enqueueSnackbar]
// );


//   const handleRemoveFile = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = {
//         lesson_id: data.lesson_id,
//         course_id: data.course_id,
//         chapter_id: data.chapter_id,
//         file_type: data.file_type,
//         required_resolutions: data.required_resolutions,
//         status: 'Pending',
//       };

//       const res = await request.post('/your-api/lessons/create', payload);

//       if (res?.data?.success) {
//         enqueueSnackbar('Lesson created successfully!', { variant: 'success' });
//         router.push(paths.dashboard.lessons.root);
//         reset();
//       } else {
//         enqueueSnackbar('Lesson creation failed.', { variant: 'error' });
//       }
//     } catch (err) {
//       console.error(err);
//       enqueueSnackbar('Submission failed.', { variant: 'error' });
//     }
//   });

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Lesson Video Form" />}
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <Box
//                 display="grid"
//                 rowGap={3}
//                 columnGap={2}
//                 gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
//               >
//                 <RHFTextField name="lesson_id" label="Lesson ID" />
//                 <RHFTextField name="course_id" label="Course ID" />
//                 <RHFTextField name="chapter_id" label="Chapter ID" />
//                 <RHFTextField name="file_type" label="File Type" disabled />
//                 <RHFSelect
//                   name="required_resolutions"
//                   label="Required Resolutions"
//                   multiple
//                   fullWidth
//                 >
//                   {['360p', '480p', '720p', '1080p'].map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </RHFSelect>
//               </Box>

//               <Stack spacing={1.5}>
//                 <Typography variant="subtitle2">Upload Video</Typography>
//                 <RHFUpload
//                   thumbnail
//                   name="file_name"
//                   onDrop={handleDrop}
//                   onRemove={handleRemoveFile}
//                   onRemoveAll={handleRemoveAllFiles}
//                   isLoading={isUploading}
//                   accept="video/*"
//                 />
//               </Stack>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//               >
//                 Submit Lesson
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// LessonsVideoForm.propTypes = {
//   currentEdutainment: PropTypes.object,
// };


// imp two with multiple selection 


// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import React, { useMemo, useState, useCallback } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useSnackbar } from 'notistack';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
// import LoadingButton from '@mui/lab/LoadingButton';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';

// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { useResponsive } from 'src/hooks/use-responsive';

// import request from 'src/api/request';
// import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// export default function LessonsVideoForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();
//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     lesson_id: Yup.string().required('Lesson ID is required'),
//     course_id: Yup.string().required('Course is required'),
//     chapter_id: Yup.string().required('Chapter is required'),
//     file_name: Yup.mixed().required('Video file is required'),
//     file_type: Yup.string().required('File type is required'),
//     required_resolutions: Yup.array().of(Yup.string()).min(1, 'Select at least one resolution'),
//   });

//   const defaultValues = useMemo(() => ({
//     lesson_id: currentEdutainment?.id || '',
//     course_id: currentEdutainment?.course_id || '',
//     chapter_id: currentEdutainment?.chapter_id || '',
//     file_name: currentEdutainment?.file_name || '',
//     file_type: currentEdutainment?.file_type || '',
//     required_resolutions: currentEdutainment?.required_resolutions || [],
//   }), [currentEdutainment]);

//   const methods = useForm({
//     resolver: yupResolver(EdutainmentSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     setValue,
//     getValues,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const handleDrop = useCallback(
//     async (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       if (!file || !file.type.startsWith('video/')) {
//         enqueueSnackbar('Please upload a valid video file.', { variant: 'error' });
//         return;
//       }

//       const fileWithPreview = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       setValue('file_name', fileWithPreview);
//       setValue('file_type', file.type);

//       try {
//         setIsUploading(true);

//         const { lesson_id, course_id, chapter_id, required_resolutions } = getValues();

//         const resolutionsArray = Array.isArray(required_resolutions)
//           ? required_resolutions
//           : [required_resolutions].filter(Boolean);

//         const uploadPayload = {
//           lesson_id,
//           course_id,
//           chapter_id,
//           file_name: file.name,
//           file_type: file.type,
//           required_resolutions: resolutionsArray,
//         };

//         // 1) Call first API to get presigned URL and ID
//         const uploadRes = await request.post('/courses/course-video-upload', uploadPayload);

//         const { id, upload_url } = uploadRes.data;

//         // 2) Upload the file using the upload_url with PUT
//         await fetch(upload_url, {
//           method: 'PUT',
//           headers: { 'Content-Type': file.type },
//           body: file,
//         });

//         // 3) Send the 'id' to second API for video conversion
//         const convertPayload = { id };
//         await request.post('/courses/course-video-convert', convertPayload);

//         enqueueSnackbar('Video uploaded and conversion started.', { variant: 'success' });
//       } catch (error) {
//         console.error('Upload or conversion error:', error);
//         enqueueSnackbar('Upload failed.', { variant: 'error' });
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [setValue, getValues, enqueueSnackbar]
//   );

//   const handleRemoveFile = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('file_name', null);
//   }, [setValue]);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = {
//         lesson_id: data.lesson_id,
//         course_id: data.course_id,
//         chapter_id: data.chapter_id,
//         file_type: data.file_type,
//         required_resolutions: data.required_resolutions,
//         status: 'Pending',
//       };

//       const res = await request.post('/your-api/lessons/create', payload);

//       if (res?.data?.success) {
//         enqueueSnackbar('Lesson created successfully!', { variant: 'success' });
//         router.push(paths.dashboard.lessons.root);
//         reset();
//       } else {
//         enqueueSnackbar('Lesson creation failed.', { variant: 'error' });
//       }
//     } catch (err) {
//       console.error(err);
//       enqueueSnackbar('Submission failed.', { variant: 'error' });
//     }
//   });

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Lesson Video Form" />}
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <Box
//                 display="grid"
//                 rowGap={3}
//                 columnGap={2}
//                 gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
//               >
//                 <RHFTextField name="lesson_id" label="Lesson ID" />
//                 <RHFTextField name="course_id" label="Course ID" />
//                 <RHFTextField name="chapter_id" label="Chapter ID" />
//                 <RHFTextField name="file_type" label="File Type" disabled />

//             <Controller
//   name="required_resolutions"
//   control={methods.control}
//   rules={{
//     required: 'Select at least one resolution',
//     validate: (value) => Array.isArray(value) && value.length > 0 || 'Select at least one resolution',
//   }}
//   render={({ field, fieldState: { error } }) => (
//     <FormControl fullWidth error={!!error}>
//       <InputLabel id="required-resolutions-label">Required Resolutions</InputLabel>
//       <Select
//         {...field}
//         labelId="required-resolutions-label"
//         multiple
//         label="Required Resolutions"
//         value={Array.isArray(field.value) ? field.value : []}
//         onChange={(e) => field.onChange(e.target.value)}
//       >
//         {['360p', '480p', '720p', '1080p'].map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </Select>
//       {error && <FormHelperText>{error.message}</FormHelperText>}
//     </FormControl>
//   )}
// />

//               </Box>

//               <Stack spacing={1.5}>
//                 <Typography variant="subtitle2">Upload Video</Typography>
//                 <RHFUpload
//                   thumbnail
//                   name="file_name"
//                   onDrop={handleDrop}
//                   onRemove={handleRemoveFile}
//                   onRemoveAll={handleRemoveAllFiles}
//                   isLoading={isUploading}
//                   accept="video/*"
//                 />
//               </Stack>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//               >
//                 Submit Lesson
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// LessonsVideoForm.propTypes = {
//   currentEdutainment: PropTypes.object,
// };



import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useMemo, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

export default function LessonsVideoForm({ currentEdutainment }) {
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideoId, setUploadedVideoId] = useState(null);

  const EdutainmentSchema = Yup.object().shape({
    lesson_id: Yup.string().required('Lesson ID is required'),
    course_id: Yup.string().required('Course is required'),
    chapter_id: Yup.string().required('Chapter is required'),
    file_name: Yup.mixed().required('Video file is required'),
    file_type: Yup.string().required('File type is required'),
    required_resolutions: Yup.array().of(Yup.string()).min(1, 'Select at least one resolution'),
  });

  const defaultValues = useMemo(() => ({
    lesson_id: currentEdutainment?.id || '',
    course_id: currentEdutainment?.course_id || '',
    chapter_id: currentEdutainment?.chapter_id || '',
    file_name: currentEdutainment?.file_name || null,
    file_type: currentEdutainment?.file_type || '',
    required_resolutions: currentEdutainment?.required_resolutions || [],
  }), [currentEdutainment]);

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { watch } = methods;
const uploadedFile = watch('file_name');


  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file || !file.type.startsWith('video/')) {
        enqueueSnackbar('Please upload a valid video file.', { variant: 'error' });
        return;
      }

      // Check required fields before upload
      const { lesson_id, course_id, chapter_id, required_resolutions } = getValues();
      if (!lesson_id || !course_id || !chapter_id || !required_resolutions?.length) {
        enqueueSnackbar('Please fill all fields before uploading the video.', { variant: 'warning' });
        return;
      }

      setValue('file_name', Object.assign(file, { preview: URL.createObjectURL(file) }));
      setValue('file_type', file.type);

      try {
        setIsUploading(true);

        // 1) Upload API - get presigned URL
        const uploadRes = await request.post('/courses/course-video-upload', {
          lesson_id,
          course_id,
          chapter_id,
          file_name: file.name,
          file_type: file.type,
          required_resolutions,
        });

        const { id, upload_url } = uploadRes.data;

        // 2) Upload the file to presigned URL
        await fetch(upload_url, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        setUploadedVideoId(id);
        enqueueSnackbar('Video uploaded successfully. Now submit to start conversion.', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Video upload failed.', { variant: 'error' });
      } finally {
        setIsUploading(false);
      }
    },
    [getValues, setValue, enqueueSnackbar]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('file_name', null);
    setUploadedVideoId(null);
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('file_name', null);
    setUploadedVideoId(null);
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (!uploadedVideoId) {
      enqueueSnackbar('Please upload a video before submitting.', { variant: 'warning' });
      return;
    }

    try {
      setIsUploading(true);

      // 3) Call conversion API only
      await request.post('/courses/course-video-convert', { id: uploadedVideoId });

      enqueueSnackbar('Video conversion started successfully!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Video conversion failed.', { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Upload Lesson Video" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              >
                <RHFTextField name="lesson_id" label="Lesson ID" />
                <RHFTextField name="course_id" label="Course ID" />
                <RHFTextField name="chapter_id" label="Chapter ID" />
                <RHFTextField name="file_type" label="File Type" disabled />

                <Controller
                  name="required_resolutions"
                  control={methods.control}
                  rules={{
                    required: 'Select at least one resolution',
                    validate: (value) =>
                      (Array.isArray(value) && value.length > 0) || 'Select at least one resolution',
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel id="required-resolutions-label">Required Resolutions</InputLabel>
                      <Select
                        {...field}
                        labelId="required-resolutions-label"
                        multiple
                        label="Required Resolutions"
                        value={Array.isArray(field.value) ? field.value : []}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {['360p', '480p', '720p', '1080p'].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && <FormHelperText>{error.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Box>

              {/* <Stack spacing={1.5}>
                <Typography variant="subtitle2">Upload Video</Typography>
                <RHFUpload
                  thumbnail
                  name="file_name"
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  isLoading={isUploading}
                  accept="video/*"
                />
              </Stack> */}
              <Stack spacing={1.5}>
  <Typography variant="subtitle2">Upload Video</Typography>
  <RHFUpload
    thumbnail
    name="file_name"
    onDrop={handleDrop}
    onRemove={handleRemoveFile}
    onRemoveAll={handleRemoveAllFiles}
    isLoading={isUploading}
    accept="video/*"
  />

  {uploadedFile && uploadedFile.preview && (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2">Video Preview</Typography>
   <video
  src={uploadedFile.preview}
  controls
  width="100%"
  style={{ borderRadius: 8, maxHeight: 400 }}
>
  <track kind="captions" label="English captions" srcLang="en" src="" default />
</video>

    </Box>
  )}
</Stack>


              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
              >
                Start Conversion
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

LessonsVideoForm.propTypes = {
  currentEdutainment: PropTypes.object,
};
