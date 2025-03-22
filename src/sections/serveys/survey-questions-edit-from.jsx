// import * as Yup from 'yup';
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
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import LoadingButton from '@mui/lab/LoadingButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { useSnackbar } from 'notistack';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { CreateSurveyQuestion } from 'src/api/servey-questions';
// import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

// export default function SurveyQuestionEditForm({ surveyId , currentQuestion }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const [questionType, setQuestionType] = useState('');
//   const [options, setOptions] = useState([]);

//   const SurveyQuestionSchema = Yup.object().shape({
//     question_type: Yup.string().required('Question Type is required'),
//     question: Yup.string().required('Question Text is required'),
//     options: Yup.array().when('question_type', (question_type, schema) => {
//       if (question_type === 'Single Choice' || question_type === 'Multiple Choice') {
//         return schema.min(1, 'At least one option is required');
//       }
//       return schema.strip(); // Removes the field when not needed
//     }),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       question_type: currentQuestion.question_type || '',
//       question: currentQuestion.question || '',
//       options: currentQuestion.options || [''],
//       surveyId,
//     }),
//     [currentQuestion.question_type, currentQuestion.question, currentQuestion.options, surveyId ]
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

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = { ...data };

//       if (data.question_type === 'Yes/No') {
//         payload.options = ['Yes', 'No']; // Yes/No has fixed options
//       } else if (
//         data.question_type === 'Single Choice' ||
//         data.question_type === 'Multiple Choice'
//       ) {
//         payload.options = Array.isArray(data.options)
//           ? data.options.filter((option) => option !== '') // Ensure it's an array
//           : []; // Default to empty array
//       } else {
//         payload.options = []; // For 'Text' type
//       }

//       const response = await CreateSurveyQuestion(payload, surveyId);

//     if (response?.success) {
//         enqueueSnackbar(currentQuestion ? 'Update success!' : 'Create success!', { variant: 'success' });
//         router.push(paths.dashboard.survey.root);
//         reset();
//         return response;
//       }

//       enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
//       return response;
//     } catch (error) {
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
//       return null;
//     }
//   });

//   const handleQuestionTypeChange = (e) => {
//     const selectedType = e.target.value;
//     setQuestionType(selectedType);
//     setValue('question_type', selectedType);
//     if (selectedType === 'Single Choice' || selectedType === 'Multiple Choice') {
//       setOptions(['']);
//       setValue('options', ['']);
//     } else {
//       setOptions([]);
//       setValue('options', []);
//     }
//   };

//   const handleAddOption = () => {
//     const updatedOptions = [...options, ''];
//     setOptions(updatedOptions);
//     setValue('options', updatedOptions);
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//     setValue('options', updatedOptions);
//   };

//   const handleRemoveOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setOptions(updatedOptions);
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
//                         <button type="button" onClick={() => handleRemoveOption(index)}>
//                           Remove
//                         </button>
//                       </Box>
//                     ))}
//                     <button type="button" onClick={handleAddOption}>
//                       Add Option
//                     </button>
//                   </Stack>
//                 )}

//                 {questionType === 'Yes/No' && (
//                   <RHFSelect name="yes_no_option" label="Answer">
//                     <MenuItem value="Yes">Yes</MenuItem>
//                     <MenuItem value="No">No</MenuItem>
//                   </RHFSelect>
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
//   currentQuestion : PropTypes.any,
// };



import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { CreateSurveyQuestion } from 'src/api/servey-questions';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function SurveyQuestionEditForm({ surveyId, currentQuestion = {} }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Ensure `currentQuestion` has default values to avoid undefined errors

  const initialValues = useMemo(() => ({
    question_type: currentQuestion?.question_type || '',
    question: currentQuestion?.question || '',
    options: currentQuestion?.options || [''],
  }), [currentQuestion]);

  const [questionType, setQuestionType] = useState(initialValues.question_type);
  const [options, setOptions] = useState(initialValues.options);

  const SurveyQuestionSchema = Yup.object().shape({
    question_type: Yup.string().required('Question Type is required'),
    question: Yup.string().required('Question Text is required'),
    options: Yup.array().when('question_type', (type, schema) => {
      if (type === 'Single Choice' || type === 'Multiple Choice') {
        return schema.min(1, 'At least one option is required');
      }
      return schema.strip();
    }),
  });

  const methods = useForm({
    resolver: yupResolver(SurveyQuestionSchema),
    defaultValues: initialValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  
  useEffect(() => {
    reset(initialValues);
    setQuestionType(initialValues.question_type);
    setOptions(initialValues.options);
  }, [initialValues, reset]);
  

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };

      if (data.question_type === 'Yes/No') {
        payload.options = ['Yes', 'No'];
      } else if (['Single Choice', 'Multiple Choice'].includes(data.question_type)) {
        payload.options = data.options.filter((option) => option.trim() !== '');
      } else {
        payload.options = [];
      }

      const response = await CreateSurveyQuestion(payload, surveyId);

      if (response?.success || response?.status === 200 || response?.status === 'success') {
        enqueueSnackbar(currentQuestion ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.survey.root);
        reset();
      } else {
        enqueueSnackbar(response?.message || response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  const handleQuestionTypeChange = (e) => {
    const selectedType = e.target.value;
    setQuestionType(selectedType);
    setValue('question_type', selectedType);
    if (['Single Choice', 'Multiple Choice'].includes(selectedType)) {
      setOptions(['']);
      setValue('options', ['']);
    } else {
      setOptions([]);
      setValue('options', []);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
    setValue('options', [...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    setValue('options', updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setValue('options', updatedOptions);
  };

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
                <RHFSelect
                  name="question_type"
                  label="Question Type"
                  value={questionType}
                  onChange={handleQuestionTypeChange}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Single Choice">Single Choice</MenuItem>
                  <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                  <MenuItem value="Yes/No">Yes/No</MenuItem>
                </RHFSelect>

                <RHFTextField name="question" label="Question Text" />

                {['Single Choice', 'Multiple Choice'].includes(questionType) && (
                  <Stack spacing={2}>
                    <Typography variant="subtitle2">Options</Typography>
                    {options.map((option, index) => (
                      <Box key={index} display="flex" gap={2}>
                        <RHFTextField
                          name={`options[${index}]`}
                          label={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveOption(index)}>
                          Remove
                        </button>
                      </Box>
                    ))}
                    <button type="button" onClick={handleAddOption}>
                      Add Option
                    </button>
                  </Stack>
                )}
              </Box>

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
  currentQuestion: PropTypes.shape({
    question_type: PropTypes.string,
    question: PropTypes.string,
    options: PropTypes.array,
  }),
};
