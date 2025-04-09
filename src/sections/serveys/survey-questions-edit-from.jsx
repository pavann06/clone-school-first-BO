// import * as Yup from 'yup'; // Ensure this is the only import for Yup
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useMemo, useState } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import MenuItem from '@mui/material/MenuItem';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { useSnackbar } from 'notistack';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { CreateSurveyQuestion } from 'src/api/servey-questions';
// import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

// export default function SurveyQuestionEditForm({ surveyId }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const [questionType, setQuestionType] = useState('');
//   const [optionss, setOptions] = useState([]);

//   const SurveyQuestionSchema = Yup.object().shape({
//     question_type: Yup.string().required('Question Type is required'),
//     question: Yup.string().required('Question Text is required'),
//     options: Yup.array().when('question_type', {
//       is: (type) => type === 'Single Choice' || type === 'Multiple Choice',
//       then: (schema) => schema.min(1, 'At least one option is required'),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       question_type: '',
//       question: '',
//       options: [],
//       surveyId,
//     }),
//     [surveyId]
//   );

//   const methods = useForm({
//     resolver: yupResolver(SurveyQuestionSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     setValue,
//     watch,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const options = watch('options', []);

 
 
//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = { ...data };
  
//       if (data.question_type === 'Yes/No') {
//         payload.options = ['Yes', 'No'];
//       } else if (
//         data.question_type === 'Single Choice' ||
//         data.question_type === 'Multiple Choice'
//       ) {
//         payload.options = Array.isArray(data.options)
//           ? data.options.filter((option) => option.trim() !== '')
//           : [];
//       } else {
//         payload.options = [];
//       }
  
//       const response = await CreateSurveyQuestion(payload, surveyId);
  
//       console.log('Full API Response:', response); // Debugging
  
//       // ✅ Handle empty responses properly
//       if (!response || Object.keys(response).length === 0) {
//         enqueueSnackbar('Survey question created successfully!', { variant: 'success' });
//         reset(); // ✅ Reset form fields
//         setQuestionType(''); // ✅ Reset question type dropdown
//         setOptions([]); // ✅ Clear options array
//         return;
//       }
  
//       // ✅ Handle normal success
//       if (response?.success || response?.status === 200 || response?.status === 'success') {
//         enqueueSnackbar(response.message || 'Survey question created successfully!', {
//           variant: 'success',
//         });
//         reset(); // ✅ Reset form fields
//         setQuestionType(''); // ✅ Reset question type dropdown
//         setOptions([]); // ✅ Clear options array
//         return;
//       }
  
//       // ✅ Handle field-specific errors
//       const errors = response?.response?.data?.data;
//       if (errors) {
//         Object.entries(errors).forEach(([field, messages]) => {
//           if (methods.setError) {
//             methods.setError(field, {
//               type: 'server',
//               message: messages[0], // First error message
//             });
//           }
//         });
//         enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
//         return;
//       }
  
//       const errorMessage = response?.message || response?.error || 'Unexpected API response';
//       enqueueSnackbar(errorMessage, { variant: 'error' });
//     } catch (error) {
//       console.error('Error Object:', error);
//       console.error('Error Response:', error.response?.data);
  
//       enqueueSnackbar(
//         error.response?.data?.message || error.message || 'Unexpected error occurred',
//         { variant: 'error' }
//       );
//     }
//   });
  

//   const handleQuestionTypeChange = (e) => {
//     const selectedType = e.target.value;
//     setQuestionType(selectedType);
//     setValue('question_type', selectedType);

//     if (selectedType === 'Single Choice' || selectedType === 'Multiple Choice') {
//       setValue('options', ['']);
//     } else {
//       setValue('options', []);
//     }
//   };

//   const handleAddOption = () => {
//     setValue('options', [...options, '']);
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setValue('options', updatedOptions);
//   };

//   const handleRemoveOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setValue('options', updatedOptions);
//   };

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
//                 <RHFSelect
//                   name="question_type"
//                   label="Question Type"
//                   onChange={handleQuestionTypeChange}
//                 >
//                   <MenuItem value="Text">Text</MenuItem>
//                   <MenuItem value="Single Choice">Single Choice</MenuItem>
//                   <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
//                   <MenuItem value="Yes/No">Yes/No</MenuItem>
//                 </RHFSelect>

//                 <RHFTextField name="question" label="Question Text" />

//                 {['Single Choice', 'Multiple Choice'].includes(questionType) && (
//                   <Stack spacing={2}>
//                     <Typography variant="subtitle2">Options</Typography>
//                     {options.map((option, index) => (
//                       <Box key={index} display="flex" gap={2}>
//                         <RHFTextField
//                           name={`options[${index}]`}
//                           label={`Option ${index + 1}`}
//                           value={option}
//                           onChange={(e) => handleOptionChange(index, e.target.value)}
//                         />
//                         <button
//                           style={{
//                             backgroundColor: "#db5f12",
//                             color: "white",
//                             border: "none",
//                             padding: "10px 20px",
//                             fontSize: "16px",
//                             borderRadius: "5px",
//                             cursor: "pointer",
//                             transition: "background-color 0.3s ease, transform 0.2s ease",
//                           }}
//                          type="button" onClick={() => handleRemoveOption(index)}>
//                           Remove
//                         </button>
//                       </Box>
//                     ))}
//                     <button
//                       style={{
//                         backgroundColor: '#46c263',
//                         color: 'white',
//                         border: 'none',
//                         padding: '10px 20px',
//                         fontSize: '16px',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         transition: 'background-color 0.3s ease, transform 0.2s ease',
//                       }}
//                       type="button"
//                       onClick={handleAddOption}
//                     >
//                       Add Option
//                     </button>
//                   </Stack>
//                 )}
//               </Box>

//               <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//                 Create Question
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// SurveyQuestionEditForm.propTypes = {
//   surveyId: PropTypes.string.isRequired,
// };


// ... (existing imports)


// second case =============================================================================


// import * as Yup from 'yup'; // Ensure this is the only import for Yup
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import React, { useMemo, useState , useEffect} from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import MenuItem from '@mui/material/MenuItem';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { useSnackbar } from 'notistack';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { CreateSurveyQuestion , UpdateSurveyQuestion} from 'src/api/servey-questions';
// import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';


// export default function SurveyQuestionEditForm({ surveyId, currentQuestion }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const [questionType, setQuestionType] = useState(currentQuestion?.question_type || '');
//   const [optionss, setOptions] = useState(currentQuestion?.options || []);

//   const SurveyQuestionSchema = Yup.object().shape({
//     question_type: Yup.string().required('Question Type is required'),
//     question: Yup.string().required('Question Text is required'),
//     options: Yup.array().when('question_type', {
//       is: (type) => type === 'Single Choice' || type === 'Multiple Choice',
//       then: (schema) => schema.min(1, 'At least one option is required'),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       question_type: currentQuestion?.question_type || '',
//       question: currentQuestion?.question || '',
//       options: currentQuestion?.options || [],
//       surveyId,
//     }),
//     [currentQuestion, surveyId]
//   );

//   const methods = useForm({
//     resolver: yupResolver(SurveyQuestionSchema),
//     defaultValues,
//   });

  

//   const {
//     reset,
//     setValue,
//     watch,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   useEffect(() => {
//     if (currentQuestion) {
//       reset({
//         question_type: currentQuestion.question_type || '',
//         question: currentQuestion.question || '',
//         options: currentQuestion.options || [],
//         surveyId,
//       });
//       setQuestionType(currentQuestion.question_type || '');
//       setOptions(currentQuestion.options || []);
//     }
//   }, [currentQuestion, reset, surveyId]);

//   const options = watch('options', []);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = { ...data };

//       if (data.question_type === 'Yes/No') {
//         payload.options = ['Yes', 'No'];
//       } else if (
//         data.question_type === 'Single Choice' ||
//         data.question_type === 'Multiple Choice'
//       ) {
//         payload.options = Array.isArray(data.options)
//           ? data.options.filter((option) => option.trim() !== '')
//           : [];
//       } else {
//         payload.options = [];
//       }

//       let response;

//       if (currentQuestion) {
//         // EDIT
//         response = await UpdateSurveyQuestion(currentQuestion.id, payload);
//       } else {
//         // CREATE
//         response = await CreateSurveyQuestion(payload, surveyId);
//       }

//       if (!response || Object.keys(response).length === 0 || response?.success || response?.status === 200 || response?.status === 'success') {
//         enqueueSnackbar(response?.message || `Survey question ${currentQuestion ? 'updated' : 'created'} successfully!`, {
//           variant: 'success',
//         });
//         reset();
//         setQuestionType('');
//         setOptions([]);
//         return;
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
//         return;
//       }

//       enqueueSnackbar(response?.message || 'Unexpected error occurred', { variant: 'error' });
//     } catch (error) {
//       enqueueSnackbar(
//         error.response?.data?.message || error.message || 'Unexpected error occurred',
//         { variant: 'error' }
//       );
//     }
//   });

//   const handleQuestionTypeChange = (e) => {
//     const selectedType = e.target.value;
//     setQuestionType(selectedType);
//     setValue('question_type', selectedType);
//     if (selectedType === 'Single Choice' || selectedType === 'Multiple Choice') {
//       setValue('options', ['']);
//     } else {
//       setValue('options', []);
//     }
//   };

//   const handleAddOption = () => {
//     setValue('options', [...options, '']);
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setValue('options', updatedOptions);
//   };

//   const handleRemoveOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setValue('options', updatedOptions);
//   };

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
//                 <RHFSelect
//                   name="question_type"
//                   label="Question Type"
//                   onChange={handleQuestionTypeChange}
//                 >
//                   <MenuItem value="Text">Text</MenuItem>
//                   <MenuItem value="Single Choice">Single Choice</MenuItem>
//                   <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
//                   <MenuItem value="Yes/No">Yes/No</MenuItem>
//                 </RHFSelect>

//                 <RHFTextField name="question" label="Question Text" />

//                 {['Single Choice', 'Multiple Choice'].includes(questionType) && (
//                   <Stack spacing={2}>
//                     <Typography variant="subtitle2">Options</Typography>
//                     {options.map((option, index) => (
//                       <Box key={index} display="flex" gap={2}>
//                         <RHFTextField
//                           name={`options[${index}]`}
//                           label={`Option ${index + 1}`}
//                           value={option}
//                           onChange={(e) => handleOptionChange(index, e.target.value)}
//                         />
//                         <button
//                           style={{
//                             backgroundColor: "#db5f12",
//                             color: "white",
//                             border: "none",
//                             padding: "10px 20px",
//                             fontSize: "16px",
//                             borderRadius: "5px",
//                             cursor: "pointer",
//                           }}
//                           type="button"
//                           onClick={() => handleRemoveOption(index)}
//                         >
//                           Remove
//                         </button>
//                       </Box>
//                     ))}
//                     <button
//                       style={{
//                         backgroundColor: '#46c263',
//                         color: 'white',
//                         border: 'none',
//                         padding: '10px 20px',
//                         fontSize: '16px',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                       }}
//                       type="button"
//                       onClick={handleAddOption}
//                     >
//                       Add Option
//                     </button>
//                   </Stack>
//                 )}
//               </Box>

//               <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//                 {currentQuestion ? 'Update Question' : 'Create Question'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// SurveyQuestionEditForm.propTypes = {
//   surveyId: PropTypes.string.isRequired,
//   currentQuestion: PropTypes.object, // Optional for editing
// };


// third ----------------------------------------------------------------------









import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { CreateSurveyQuestion, UpdateSurveyQuestion } from 'src/api/servey-questions';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function SurveyQuestionEditForm({ surveyId, currentQuestion }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const SurveyQuestionSchema = Yup.object().shape({
    question_type: Yup.string().required('Question Type is required'),
    question: Yup.string().required('Question Text is required'),
    options: Yup.array().when('question_type', {
      is: (type) => type === 'Single Choice' || type === 'Multiple Choice',
      then: (schema) => schema.min(1, 'At least one option is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(SurveyQuestionSchema),
    defaultValues: {
      question_type: '',
      question: '',
      options: [],
      surveyId,
    },
  });

  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const questionType = watch('question_type');

  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'options',
  });

  // Prefill form when currentQuestion changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.id) {
      reset({
        question_type: currentQuestion.question_type || '',
        question: currentQuestion.question || '',
        options: currentQuestion.options || [],
        surveyId,
      });
    }
  }, [currentQuestion, reset, surveyId]);




  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const payload = { ...data };

  //     if (data.question_type === 'Yes/No') {
  //       payload.options = ['Yes', 'No'];
  //     } else if (
  //       data.question_type === 'Single Choice' ||
  //       data.question_type === 'Multiple Choice'
  //     ) {
  //       payload.options = Array.isArray(data.options)
  //         ? data.options.filter((option) => option.trim() !== '')
  //         : [];
  //     } else {
  //       payload.options = [];
  //     }

  //     let response;

  //     if (currentQuestion) {
  //       response = await UpdateSurveyQuestion({ ...payload, id: currentQuestion.id });
  //     } else {
  //       response = await CreateSurveyQuestion(payload, surveyId);
  //     }
      

  //     if (
  //       !response ||
  //       Object.keys(response).length === 0 ||
  //       response?.success ||
  //       response?.status === 200 ||
  //       response?.status === 'success'
  //     ) {
  //       enqueueSnackbar(response?.message || `Survey question ${currentQuestion ? 'updated' : 'created'} successfully!`, {
  //         variant: 'success',
  //       });
  //       reset();
  //       return;
  //     }

  //     const errors = response?.response?.data?.data;
  //     if (errors) {
  //       Object.entries(errors).forEach(([field, messages]) => {
  //         if (methods.setError) {
  //           methods.setError(field, {
  //             type: 'server',
  //             message: messages[0],
  //           });
  //         }
  //       });
  //       enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
  //       return;
  //     }

  //     enqueueSnackbar(response?.message || 'Unexpected error occurred', { variant: 'error' });
  //   } catch (error) {
  //     enqueueSnackbar(
  //       error.response?.data?.message || error.message || 'Unexpected error occurred',
  //       { variant: 'error' }
  //     );
  //   }
  // });










  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const payload = { ...data };
  
  //     if (data.question_type === 'Yes/No') {
  //       payload.options = ['Yes', 'No'];
  //     } else if (
  //       data.question_type === 'Single Choice' ||
  //       data.question_type === 'Multiple Choice'
  //     ) {
  //       payload.options = Array.isArray(data.options)
  //         ? data.options.filter((option) => option.trim() !== '')
  //         : [];
  //     } else {
  //       payload.options = [];
  //     }
  
  //     let response;
  
  //     if (currentQuestion) {
  //       response = await UpdateSurveyQuestion({ ...payload, id: currentQuestion.id });
  //     } else {
  //       response = await CreateSurveyQuestion(payload, surveyId);
  //     }
  
    
  
  //     const errors = response?.response?.data?.data;
  //     if (errors) {
  //       Object.entries(errors).forEach(([field, messages]) => {
  //         if (methods.setError) {
  //           methods.setError(field, {
  //             type: 'server',
  //             message: messages[0],
  //           });
  //         }
  //       });
  //       enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
  //       return;
  //     }
  
  //     enqueueSnackbar(response?.data?.message || 'Unexpected error occurred', {
  //       variant: 'error',
  //     });
  //   } catch (error) {
  //     enqueueSnackbar(
  //       error.response?.data?.message || error.message || 'Unexpected error occurred',
  //       { variant: 'error' }
  //     );
  //   }
  // });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };
  
      if (data.question_type === 'Yes/No') {
        payload.options = ['Yes', 'No'];
      } else if (
        data.question_type === 'Single Choice' ||
        data.question_type === 'Multiple Choice'
      ) {
        payload.options = Array.isArray(data.options)
          ? data.options.filter((option) => option.trim() !== '')
          : [];
      } else {
        payload.options = [];
      }
  
      let response;
  
      if (currentQuestion) {
        response = await UpdateSurveyQuestion({ ...payload, id: currentQuestion.id });
      } else {
        response = await CreateSurveyQuestion(payload, surveyId);
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
        return;
      }
  
      // Only show success message if there are no errors
      enqueueSnackbar(
        currentQuestion 
          ? 'Question updated successfully!' 
          : 'Question created successfully!',
        { variant: 'success' }
      );
      
      // You might want to add any additional success handling here
      // For example, closing a modal or refreshing data
      // onSuccessCallback();
  
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || error.message || 'Unexpected error occurred',
        { variant: 'error' }
      );
    }
  });
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
                <RHFSelect name="question_type" label="Question Type">
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Single Choice">Single Choice</MenuItem>
                  <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                  <MenuItem value="Yes/No">Yes/No</MenuItem>
                </RHFSelect>

                <RHFTextField name="question" label="Question Text" />
              </Box>

              {['Single Choice', 'Multiple Choice'].includes(questionType) && (
                <Stack spacing={2}>
                  <Typography variant="subtitle2">Options</Typography>

                  {optionFields.map((field, index) => (
                    <Box key={field.id} display="flex" gap={2}>
                      <RHFTextField
                        name={`options[${index}]`}
                        label={`Option ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        style={{
                          backgroundColor: '#db5f12',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          fontSize: '16px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </Box>
                  ))}

                  <button
                    type="button"
                    onClick={() => append('')}
                    style={{
                      backgroundColor: '#46c263',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Add Option
                  </button>
                </Stack>
              )}

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {currentQuestion ? 'Update Question' : 'Create Question'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SurveyQuestionEditForm.propTypes = {
  surveyId: PropTypes.string.isRequired,
  currentQuestion: PropTypes.object,
};



































































