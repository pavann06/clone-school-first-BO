// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm , Controller} from 'react-hook-form';
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
// import { CreateMcq , UpdateMcq } from 'src/api/mcq';

// // API and Services

// // Form Components
// import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';

// import OnlineCourseDropdown from './online-courses-dropdown';
// import LessonsDropdown from './lessons-dropdown';

// // ----------------------------------------------------------------------

// export default function McqsNewEditForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     question: Yup.string().required('Question is required'),
//     question_number: Yup.number().required('Question number is required'),
//     question_marks: Yup.number().required('Marks are required'),
//     description: Yup.string().required('description should be given'),
//     options: Yup.array()
//       .of(Yup.string().required('Option cannot be empty'))
//       .min(2, 'At least 2 options required'),
//     correct_answer: Yup.string().required('Please select the correct answer'),
//     course_id: Yup.string().required('Select a Course'),
//     lesson_id: Yup.string().required('Select a lesson'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       question: currentEdutainment?.question || '',
//       description: currentEdutainment?.description || '',
//       question_number: currentEdutainment?.question_number || '',
//       question_marks: currentEdutainment?.question_marks || '',
//       options: currentEdutainment?.options || [],
//       correct_answer: currentEdutainment?.correct_answer || '',
//       course_id: currentEdutainment?.course_id || '',
//       lesson_id: currentEdutainment?.lesson_id || '',
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
        
//       };

//       if (!currentEdutainment) {
//         payload.status = 'Pending';
//       }

//       const response = currentEdutainment
//         ? await UpdateMcq({ ...payload, id: currentEdutainment.id })
//         : await CreateMcq(payload);

//       console.log('Full API Response:', response); // Debugging

//       if (response?.success) {
//         enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.mcqs.root);
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
//               <RHFTextField name="question" label="Question" />
//               <RHFTextField name="question_number" label="Question Number" type="number" />
//               <RHFTextField name="question_marks" label="Question Marks" type="number" />
//               <RHFTextField name="description" label="Description" multiline rows={3} />

//               {/* Dynamic Options Input */}
//               {values.options.map((opt, index) => (
//                 <RHFTextField
//                   key={index}
//                   name={`options[${index}]`}
//                   label={`Option ${index + 1}`}
//                 />
//               ))}

//               {/* Add / Remove buttons for options */}
//               <Box display="flex" gap={2}>
//                 <LoadingButton
//                   variant="outlined"
//                   onClick={() => setValue('options', [...values.options, ''])}
//                 >
//                   Add Option
//                 </LoadingButton>
//                 {values.options.length > 2 && (
//                   <LoadingButton
//                     variant="outlined"
//                     color="error"
//                     onClick={() => setValue('options', values.options.slice(0, -1))}
//                   >
//                     Remove Option
//                   </LoadingButton>
//                 )}
//               </Box>

//               {/* Select correct answer from options */}
//               <RHFSelect name="correct_answer" label="Correct Answer">
//                 {values.options.map((opt, index) => (
//                   <MenuItem key={index} value={opt}>
//                     {opt || `Option ${index + 1}`}
//                   </MenuItem>
//                 ))}
//               </RHFSelect>

//               <Box>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Select Course
//                 </Typography>
//                 <Controller
//                   name="course_id"
//                   control={methods.control}
//                   render={({ field, fieldState: { error } }) => (
//                     <>
//                       <OnlineCourseDropdown value={field.value} onChange={field.onChange} />
//                       {error && (
//                         <Typography variant="caption" color="error">
//                           {error.message}
//                         </Typography>
//                       )}
//                     </>
//                   )}
//                 />
//               </Box>

//               <Box>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Select Lesson
//                 </Typography>
//                 <Controller
//                   name="lesson_id"
//                   control={methods.control}
//                   render={({ field, fieldState: { error } }) => (
//                     <>
//                       <OnlineCourseDropdown value={field.value} onChange={field.onChange} />
//                       {error && (
//                         <Typography variant="caption" color="error">
//                           {error.message}
//                         </Typography>
//                       )}
//                     </>
//                   )}
//                 />
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentEdutainment ? 'Create MCQs' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// McqsNewEditForm.propTypes = {
//   currentEdutainment: PropTypes.any,
// };
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';

import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import { CreateMcq, UpdateMcq } from 'src/api/mcq';

import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';

import OnlineCourseDropdown from './online-courses-dropdown';
import LessonsDropdown from './lessons-dropdown';

export default function McqsNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    question_number: Yup.number().required('Question number is required'),
    question_marks: Yup.number().required('Marks are required'),
    description: Yup.string().required('Description should be given'),
    options: Yup.array()
      .of(Yup.string().required('Option cannot be empty'))
      .min(2, 'At least 2 options required'),
    correct_answer: Yup.string().required('Please select the correct answer'),
    course_id: Yup.string().required('Select a Course'),
    lesson_id: Yup.string().required('Select a Lesson'),
  });

  const defaultValues = useMemo(() => {
    let safeOptions = [];
    try {
      if (Array.isArray(currentEdutainment?.options)) {
        safeOptions = currentEdutainment.options;
      } else if (typeof currentEdutainment?.options === 'string') {
        safeOptions = JSON.parse(currentEdutainment.options);
      }
    } catch (err) {
      console.warn('Failed to parse options:', err);
    }

    return {
      question: currentEdutainment?.question || '',
      description: currentEdutainment?.description || '',
      question_number: currentEdutainment?.question_number || '',
      question_marks: currentEdutainment?.question_marks || '',
      options: safeOptions,
      correct_answer: currentEdutainment?.correct_answer || '',
      course_id: currentEdutainment?.course_id || '',
      lesson_id: currentEdutainment?.lesson_id || '',
    };
  }, [currentEdutainment]);

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
    try {
      const payload = {
        ...data,
        
      };

      if (!currentEdutainment) {
        payload.status = 'Pending';
      }

      const response = currentEdutainment
        ? await UpdateMcq({ ...payload, id: currentEdutainment.id })
        : await CreateMcq(payload);

      console.log('Full API Response:', response); // Debugging

      if (response?.success) {
        enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.mcqs.root);
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

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file.type.startsWith('image/')) {
        setValue('image', fileWithPreview);
        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('image', uploadedUrl);
          enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
        }
      } else if (file.type.startsWith('video/')) {
        setValue('video', fileWithPreview);
        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('video', uploadedUrl);
          enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
        }
      } else {
        enqueueSnackbar('Unsupported file type', { variant: 'error' });
      }
    }
  }, [setValue, enqueueSnackbar, handleUpload]);

  const handleRemoveFile = useCallback(() => setValue('image', null), [setValue]);
  const handleRemoveAllFiles = useCallback(() => setValue('image', null), [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="question" label="Question" />
              <RHFTextField name="question_number" label="Question Number" type="number" />
              <RHFTextField name="question_marks" label="Question Marks" type="number" />
              <RHFTextField name="description" label="Description" multiline rows={3} />

              {/* Dynamic Options Input */}
              {Array.isArray(values.options) &&
                values.options.map((opt, index) => (
                  <RHFTextField
                    key={index}
                    name={`options[${index}]`}
                    label={`Option ${index + 1}`}
                  />
                ))}

              {/* Add / Remove buttons */}
              <Box display="flex" gap={2}>
                <LoadingButton
                  variant="outlined"
                  onClick={() => setValue('options', [...values.options, ''])}
                >
                  Add Option
                </LoadingButton>
                {values.options.length > 2 && (
                  <LoadingButton
                    variant="outlined"
                    color="error"
                    onClick={() => setValue('options', values.options.slice(0, -1))}
                  >
                    Remove Option
                  </LoadingButton>
                )}
              </Box>

              {/* Correct Answer Selector */}
              <RHFSelect name="correct_answer" label="Correct Answer">
                {Array.isArray(values.options) &&
                  values.options.map((opt, index) => (
                    <MenuItem key={index} value={opt}>
                      {opt || `Option ${index + 1}`}
                    </MenuItem>
                  ))}
              </RHFSelect>

              {/* Course Selector */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Select Course
                </Typography>
                <Controller
                  name="course_id"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <OnlineCourseDropdown value={field.value} onChange={field.onChange} />
                      {error && (
                        <Typography variant="caption" color="error">
                          {error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>

              {/* Lesson Selector */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Select Lesson
                </Typography>
                <Controller
                  name="lesson_id"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <LessonsDropdown value={field.value} onChange={field.onChange} />
                      {error && (
                        <Typography variant="caption" color="error">
                          {error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Box>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create MCQs' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

McqsNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
