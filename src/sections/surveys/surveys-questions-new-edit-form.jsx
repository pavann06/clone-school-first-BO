

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Card, Stack, MenuItem, Grid, CardHeader, Typography, Button, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';
import { CreateForumFeeds, UpdateForumFeeds } from 'src/api/forum-feeds';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SurveysQuestionsNewEditForm({ currentFeed }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const QuestionSchema = Yup.object().shape({
    question_type: Yup.string().required('Question Type is required'),
    question_text: Yup.string().required('Question is required'),
    options: Yup.array().when('question_type', {
      is: (type) => type === 'Single Choice' || type === 'Multiple Choice',
      then: (schema) => schema.min(1, 'At least one option is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      question_type: currentFeed?.question_type || '',
      question_text: currentFeed?.question_text || '',
      options: currentFeed?.options || [],
    }),
    [currentFeed]
  );

  const methods = useForm({
    resolver: yupResolver(QuestionSchema),
    defaultValues,
  });

  const { reset, watch, control, handleSubmit, formState: { isSubmitting } } = methods;
  const values = watch();
  const { fields, append, remove } = useFieldArray({ control, name: 'options' });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        options: data.question_type === 'Yes/No' ? ['Yes', 'No'] : data.options,
      };
  
      const response = currentFeed
        ? await UpdateForumFeeds({ ...payload, id: currentFeed.id })
        : await CreateForumFeeds(payload);
  
      if (response?.success) {
        enqueueSnackbar(currentFeed ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push('/dashboard');
        reset();
        return response; // ✅ Explicit return
      }
  
      const errorMessage = response?.error || 'Operation failed';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return Promise.reject(new Error(errorMessage)); // ✅ Ensures function returns a value
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return Promise.reject(error); // ✅ Ensures function returns a value
    }
  });
  
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader title={currentFeed ? 'Edit Question' : 'Create Question'} />
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFSelect name="question_type" label="Question Type">
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="Single Choice">Single Choice</MenuItem>
            <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
            <MenuItem value="Yes/No">Yes/No</MenuItem>
          </RHFSelect>

          <RHFTextField name="question_text" label="Question" multiline rows={2} />

          {(values.question_type === 'Single Choice' || values.question_type === 'Multiple Choice') && (
            <Stack spacing={2}>
              <Typography variant="subtitle2">Options</Typography>
              {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <RHFTextField name={`options.${index}`} label={`Option ${index + 1}`} />
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={() => append('')} variant="contained">Add Option</Button>
            </Stack>
          )}

          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {currentFeed ? 'Save Changes' : 'Create Question'}
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

SurveysQuestionsNewEditForm.propTypes = {
  currentFeed: PropTypes.any,
};

