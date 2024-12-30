// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useMemo, useState, useCallback } from 'react'; 

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
// import { CreateSurveyQuestion, UpdateSurveyQuestion } from 'src/api/servey-questions';

// // Form Components
// import FormProvider, {
//   RHFTextField,
//   RHFSelect,
//   RHFMultiSelect,
// } from 'src/components/hook-form';

// export default function SurveyQuestionEditForm({ currentSurvey }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const [questionType, setQuestionType] = useState('Text'); // State to track selected question type
//   const [options, setOptions] = useState(['']); // State to hold options for Single Choice/Multiple Choice

//   const SurveySchema = Yup.object().shape({
//     question_type: Yup.string().required('Question Type is required'),
//     question_text: Yup.string().required('Question Text is required'),
//     options: Yup.array().when('question_type', {
//       is: (val) => val === 'Single Choice' || val === 'Multiple Choice',
//       then: Yup.array().min(1, 'At least one option is required'),
//     }),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       question_type: 'Text',
//       question_text: currentSurvey?.question_text || '',
//       options: currentSurvey?.options || [''],
//     }),
//     [currentSurvey]
//   );

//   const methods = useForm({
//     resolver: yupResolver(SurveySchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const response = currentSurvey
//         ? await UpdateSurveyQuestion({ ...data, id: currentSurvey.id })
//         : await CreateSurveyQuestion(data);

//       if (response?.success) {
//         enqueueSnackbar(currentSurvey ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.servey.root);
//         reset();
//         return response;
//       }

//       const errorMessage = response?.error || 'Operation failed';
//       enqueueSnackbar(errorMessage, { variant: 'error' });
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
//     setValue('question_type', selectedType); // Set the selected type in form state

//     // Reset options if switching from Text or Yes/No
//     if (selectedType !== 'Single Choice' && selectedType !== 'Multiple Choice') {
//       setOptions(['']);
//       setValue('options', []);
//     }
//   };

//   const handleAddOption = () => {
//     setOptions((prev) => [...prev, '']); // Add a new empty option field
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//     setValue('options', updatedOptions); // Update options in form state
//   };

//   const handleRemoveOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setOptions(updatedOptions);
//     setValue('options', updatedOptions); // Remove the option from form state
//   };

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Survey Question Information" />}

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
//                 {/* Question Type Dropdown */}
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

//                 {/* Question Text Field */}
//                 <RHFTextField name="question_text" label="Question Text" />

//                 {/* Conditionally Render Fields Based on Question Type */}
//                 {questionType === 'Text' && (
//                   <RHFTextField name="answer" label="Answer" />
//                 )}

//                 {questionType === 'Single Choice' && (
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
//                     <button type="button" onClick={handleAddOption}
//                     >
//                       Add Option
//                     </button>
//                   </Stack>
//                 )}

//                 {questionType === 'Multiple Choice' && (
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

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentSurvey ? 'Create Question' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// SurveyQuestionEditForm.propTypes = {
//   currentSurvey: PropTypes.any,
// };

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState } from 'react';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { CreateSurveyQuestion, UpdateSurveyQuestion } from 'src/api/servey-questions';
// Form Components
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function SurveyQuestionEditForm({ surveyId }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [questionType, setQuestionType] = useState('Text');
  const [options, setOptions] = useState(['']);

  const SurveySchema = Yup.object().shape({
    question_type: Yup.string().required('Question Type is required'),
    question_text: Yup.string().required('Question Text is required'),
    options: Yup.array().when('question_type', {
      is: (val) => val === 'Single Choice' || val === 'Multiple Choice',
      then: Yup.array().min(1, 'At least one option is required'),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      question_type: questionType, // Use questionType here
      question_text: '',
      options,
    }),
    [questionType, options] // Include both questionType and options in the dependency array
  );
  

  const methods = useForm({
    resolver: yupResolver(SurveySchema),
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
      const payload = { ...data };

      const response = await CreateSurveyQuestion(payload, surveyId); // Create new question

      if (response?.success) {
        enqueueSnackbar('Create success!', { variant: 'success' });
        router.push(paths.dashboard.survey.root);
        reset();
      } else {
        enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  const handleQuestionTypeChange = (e) => {
    const selectedType = e.target.value;
    setQuestionType(selectedType);
    setValue('question_type', selectedType);
    if (selectedType !== 'Single Choice' && selectedType !== 'Multiple Choice') {
      setOptions(['']);
      setValue('options', []);
    }
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, '']);
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
                  onChange={handleQuestionTypeChange}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Single Choice">Single Choice</MenuItem>
                  <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                  <MenuItem value="Yes/No">Yes/No</MenuItem>
                </RHFSelect>

                <RHFTextField name="question_text" label="Question Text" />

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

                {questionType === 'Yes/No' && (
                  <RHFSelect name="yes_no_option" label="Answer">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </RHFSelect>
                )}
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Create Question
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
};
