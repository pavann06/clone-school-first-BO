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

// export default function SurveyQuestionEditForm({ surveyId }) {
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
//       question_type: '',
//       question: '',
//       options: [''],
//       surveyId, // Add this if required
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

//       console.log('API Response:', response); // Debugging

//       if (response?.success || response?.status === 200 || response?.status === 'success') {
//         enqueueSnackbar('Create success!', { variant: 'success' });
//         router.push(paths.dashboard.survey?.root || '/dashboard/survey');
//         reset();
//       } else {
//         const errorMessage =
//           response?.message ||
//           response?.error ||
//           JSON.stringify(response) ||
//           'Unexpected API response';
//         enqueueSnackbar(errorMessage, { variant: 'error' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
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
// };








import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useSnackbar } from 'notistack';

// UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { CreateSurveyQuestion, UpdateSurveyQuestion } from 'src/api/servey-questions';

// Form Components
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function CompetitionNewEditForm({ currentCompetition, surveyId }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const CompetitionSchema = Yup.object().shape({
    question_type: Yup.string().required('Question type is required'),
    question: Yup.string().required('Question is required'),
    options: Yup.array()
      .test('options-required', 'At least two options are required', (value, context) => {
        const type = context.parent.question_type;
        if (['Single Choice', 'Multiple Choice'].includes(type)) {
          return value && value.length >= 2;
        }
        if (type === 'Yes/No') {
          return value && value.length === 2;
        }
        return true;
      })
      .of(Yup.string().required('Option is required')),
  });
  
  

  const defaultValues = {
    question_type: currentCompetition?.question_type || 'Text',
    question: currentCompetition?.question || '',
    options: currentCompetition?.options || (['Yes/No'].includes(currentCompetition?.question_type) ? ['Yes', 'No'] : []),
  };

  const methods = useForm({
    resolver: yupResolver(CompetitionSchema),
    defaultValues,
  });

  const { control, watch, handleSubmit, setValue, formState: { isSubmitting } } = methods;
  const questionType = watch('question_type');
  const { fields, append, remove } = useFieldArray({ control, name: 'options' });

  React.useEffect(() => {
    if (questionType === 'Yes/No') {
      setValue('options', ['Yes', 'No']);
    } else if (['Single Choice', 'Multiple Choice'].includes(questionType) && fields.length === 0) {
      setValue('options', ['', '']);
    }
  }, [questionType, setValue, fields.length]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data, surveyId };
      console.log("Submitting with surveyId:", surveyId); // Debugging step
      const response = currentCompetition
        ? await UpdateSurveyQuestion({ ...payload, id: currentCompetition.id })
        : await CreateSurveyQuestion(payload);

      if (response?.success) {
        enqueueSnackbar(currentCompetition ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.competition.root);
      } else {
        throw new Error(response?.error || 'Operation failed');
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFSelect name="question_type" label="Question Type">
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="Single Choice">Single Choice</MenuItem>
                <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                <MenuItem value="Yes/No">Yes/No</MenuItem>
              </RHFSelect>
              <RHFTextField name="question" label="Question" multiline rows={3} />
              {['Single Choice', 'Multiple Choice', 'Yes/No'].includes(questionType) && (
                <Box>
                  <Typography variant="subtitle2">Options</Typography>
                  {fields.map((item, index) => (
                    <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                      <RHFTextField name={`options[${index}]`} label={`Option ${index + 1}`} />
                      {questionType !== 'Yes/No' && (
                        <IconButton onClick={() => remove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  ))}
                  {['Single Choice', 'Multiple Choice'].includes(questionType) && (
                    <LoadingButton onClick={() => append('')} variant="outlined" sx={{ mt: 1 }}>
                      Add Option
                    </LoadingButton>
                  )}
                </Box>
              )}
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {currentCompetition ? 'Save Changes' : 'Create Competition'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CompetitionNewEditForm.propTypes = {
  currentCompetition: PropTypes.any,
  surveyId: PropTypes.string.isRequired,
};
