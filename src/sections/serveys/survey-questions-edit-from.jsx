import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { CreateSurveyQuestion } from 'src/api/servey-questions';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

export default function SurveyQuestionEditForm({ surveyId }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState([]);

  // const SurveyQuestionSchema = Yup.object().shape({
  //   question_type: Yup.string().required('Question Type is required'),
  //   question: Yup.string().required('Question Text is required'),
  //   options: Yup.array().when('question_type', {
  //     is: (val) => val === 'Single Choice' || val === 'Multiple Choice',
  //     then: Yup.array().min(1, 'At least one option is required'),
  //   }),
  // });
  const SurveyQuestionSchema = Yup.object().shape({
    question_type: Yup.string().required('Question Type is required'),
    question: Yup.string().required('Question Text is required'),
    options: Yup.array().when('question_type', {
      is: (val) => val === 'Single Choice' || val === 'Multiple Choice',
      then: Yup.array().min(1, 'At least one option is required'),
      otherwise: Yup.array().notRequired(), // Default case when `is` condition is false
    }),
  });

  const defaultValues = useMemo(
    () => ({
      question_type: '', // Use questionType here
      question: '',
      options: [''],
    }),
    [] // Include both questionType and options in the dependency array
  );

  const methods = useForm({
    resolver: yupResolver(SurveyQuestionSchema),
    defaultValues,
  });

  const { reset, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };

      if (data.question_type === 'Yes/No') {
        // For Yes/No questions, options can be ["Yes", "No"]
        payload.options = ['Yes', 'No'];
      } else if (
        data.question_type === 'Single Choice' ||
        data.question_type === 'Multiple Choice'
      ) {
        // For Single Choice and Multiple Choice, options should be an array of selected options
        payload.options = data.options.filter((option) => option !== ''); // Remove empty options
      } else {
        // For Text type, no options are needed
        payload.options = [];
      }

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
    if (selectedType === 'Single Choice' || selectedType === 'Multiple Choice') {
      setOptions(['']);
      setValue('options', ['']);
    } else {
      setOptions([]);
      setValue('options', []);
    }
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, ''];
    setOptions(updatedOptions);
    setValue('options', updatedOptions);
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

                {questionType === 'Yes/No' && (
                  <RHFSelect name="yes_no_option" label="Answer">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </RHFSelect>
                )}
              </Box>

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
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
