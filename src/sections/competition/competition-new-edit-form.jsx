// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useEffect, useMemo } from 'react';
// import { useSnackbar } from 'notistack';

// // UI Components
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// // Internal Utilities
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { CreateCompetition, UpdateCompetition } from 'src/api/competition';

// // Form Components
// import FormProvider, { RHFTextField } from 'src/components/hook-form';
// import SearchWords from './search-words';
// import SchoolsDropdown from './schools-dropdown';

// export default function CompetitionNewEditForm({ currentCompetition }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   // Validation Schema
//   const CompetitionSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     description: Yup.string().required('Description is required'),
//     start_time: Yup.string().required('Start time is required'),
//     max_slots: Yup.string().required('Max is required'),
//     filled_slots: Yup.string().required('Filled slots is required'), 
//     total_words: Yup.number().min(1, 'Must be at least 1').required('Total words are required'),
//     school_ids: Yup.array().of(Yup.string()).min(1, 'At least one school is required'),
//     prize_pool: Yup.number()
//       .min(0, 'Prize pool must be positive')
//       .required('Prize pool is required'),
//     words: Yup.array().of(
//       Yup.object().shape({
//         word: Yup.string().required('Word is required'),
//         points: Yup.number().required('Points are required'),
//         parts_of_speech: Yup.string().required('Part of Speech is required'),
//         usage: Yup.string().required('Usage is required'),
//         definition: Yup.string().required('Definition is required'),
//         origin: Yup.string().required('Origin is required'),
//       })
//     ),
//   });

//   // Default Values
//   const defaultValues = useMemo(
//     () => ({
//       name: currentCompetition?.name || '',
//       description: currentCompetition?.description || '',
//       total_words: currentCompetition?.total_words || 0,
//       start_time: currentCompetition?.start_time || '',
//       max_slots:  currentCompetition?.max_slots || '',
//       filled_slots:  currentCompetition?.filled_slots || '',
//       prize_pool: currentCompetition?.prize_pool || 0,
//       words: currentCompetition?.words || [],
//       school_ids: currentCompetition?.school_ids || [],
//     }),
//     [currentCompetition]
//   );

//   // Form Methods
//   const methods = useForm({
//     resolver: yupResolver(CompetitionSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     control,
//     watch,
//     handleSubmit,
//     setValue,
//     formState: { isSubmitting },
//   } = methods;
//   const values = watch();

//   const totalWords = watch('total_words');

//   // Handle Dynamic Fields
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'words',
//   });

//   useEffect(() => {
//     const totalWordsValue = Number(totalWords) || 0;
//     const currentWords = watch('words') || [];

//     if (totalWordsValue !== currentWords.length) {
//       setValue(
//         'words',
//         Array.from(
//           { length: totalWordsValue },
//           (_, i) =>
//             currentWords[i] || {
//               word: '',
//               points: '',
//               parts_of_speech: '',
//               usage: '',
//               definition: '',
//               origin: '',
//             }
//         )
//       );
//     }
//   }, [totalWords, setValue, watch]);

//   // Handle Form Submission
//   const onSubmit = handleSubmit(async (data) => {
//     console.log('Submitting:', JSON.stringify(data.words, null, 2)); // Debugging
//     try {
//       const payload = { ...data };
//       const response = currentCompetition
//         ? await UpdateCompetition({ ...payload, id: currentCompetition.id })
//         : await CreateCompetition(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentCompetition ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.competition.root);
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

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <RHFTextField name="name" label="Competition Name" />
//               <RHFTextField name="description" label="Description" multiline rows={4} />
//               <Box>
//                 <Typography>Start Time</Typography>
//                 <RHFTextField name="start_time" label="" type="datetime-local" />
//               </Box>

//               <RHFTextField name="prize_pool" label="Prize Pool" type="number" />

//               <Box>
//                 <Typography variant="subtitle2">Select Schools</Typography>
//                 <SchoolsDropdown
//                   value={values.school_ids}
//                   onChange={(selectedSchools) => setValue('school_ids', selectedSchools)}
//                 />
//               </Box>

//                <RHFTextField name="max_slots" label="Max slots" type="number" />
//                <RHFTextField name="filled_slots" label="Filled slots" type="number" />

//               <RHFTextField
//                 name="total_words"
//                 label="Total Words"
//                 type="number"
//                 onChange={(e) => setValue('total_words', Math.max(1, Number(e.target.value) || 1))}
//                 onWheel={(e) => e.target.blur()} // Prevents changing value on scroll
//               />

//               {/* Dynamic Search Words */}
//               {fields.map((item, index) => (
//                 <Box key={item.id} sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
//                   <Typography variant="subtitle1">Word {index + 1}</Typography>
//                   <SearchWords
//                     name={`words[${index}].word`}
//                     value={watch(`words.${index}.word`) || ''} // Ensure controlled value
//                     onChange={(selectedWord) => {
//                       setValue(`words.${index}`, {
//                         word: selectedWord?.word || '',
//                         points: selectedWord?.points || '',
//                         parts_of_speech: selectedWord?.parts_of_speech || '',
//                         usage: selectedWord?.usage || '',
//                         definition: selectedWord?.definition || '',
//                         origin: selectedWord?.origin || '',
//                       });
//                     }}
//                   />
//                 </Box>
//               ))}

//               <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//                 {currentCompetition ? 'Save Changes' : 'Create Competition'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// CompetitionNewEditForm.propTypes = {
//   currentCompetition: PropTypes.any,
// };



import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';

// UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { CreateCompetition, UpdateCompetition } from 'src/api/competition';

// Form Components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import SearchWords from './search-words';
import SchoolsDropdown from './schools-dropdown';

export default function CompetitionNewEditForm({ currentCompetition }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Validation Schema
  const CompetitionSchema = Yup.object().shape({
    contest_name: Yup.string().required('Name is required'),
    contest_description: Yup.string().required('Description is required'),
    start_time: Yup.string().required('Start time is required'),
    end_time: Yup.string().required('End time is required'),
    max_slots: Yup.string().required('Max is required'),
    filled_slots: Yup.string().required('Filled slots is required'), 
    total_words: Yup.number().min(1, 'Must be at least 1').required('Total words are required'),
    school_ids: Yup.array().of(Yup.string()).min(1, 'At least one school is required'),
    prize_pool: Yup.number()
      .min(0, 'Prize pool must be positive')
      .required('Prize pool is required'),
    words: Yup.array().of(
      Yup.object().shape({
        word: Yup.string().required('Word is required'),
        points: Yup.number().required('Points are required'),
        parts_of_speech: Yup.string().required('Part of Speech is required'),
        usage: Yup.string().required('Usage is required'),
        definition: Yup.string().required('Definition is required'),
        origin: Yup.string().required('Origin is required'),
      })
    ),
    buffer_time: Yup.number().min(0, 'Buffer time must be a positive number').required('Buffer time is required'),
    contest_status: Yup.string().oneOf(['Upcoming'], 'Contest status must be Upcoming').required('Contest status is required'),
  });

  // Default Values
  const defaultValues = useMemo(
    () => ({
      contest_name: currentCompetition?.contest_name || '',
      contest_description: currentCompetition?.contest_description || '',
      total_words: currentCompetition?.total_words || 0,
      start_time: currentCompetition?.start_time || '',
      end_time: currentCompetition?.end_time || '',
      max_slots: currentCompetition?.max_slots || '',
      filled_slots: currentCompetition?.filled_slots || '',
      prize_pool: currentCompetition?.prize_pool || 0,
      words: currentCompetition?.words || [],
      school_ids: currentCompetition?.school_ids || [],
      buffer_time: currentCompetition?.buffer_time || 0,
      contest_status: 'Upcoming', // Set default contest status as 'upcoming' (not editable)
    }),
    [currentCompetition]
  );

  // Form Methods
  const methods = useForm({
    resolver: yupResolver(CompetitionSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  const totalWords = watch('total_words');

  // Handle Dynamic Fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'words',
  });

  useEffect(() => {
    const totalWordsValue = Number(totalWords) || 0;
    const currentWords = watch('words') || [];

    if (totalWordsValue !== currentWords.length) {
      setValue(
        'words',
        Array.from(
          { length: totalWordsValue },
          (_, i) =>
            currentWords[i] || {
              word: '',
              points: '',
              parts_of_speech: '',
              usage: '',
              definition: '',
              origin: '',
            }
        )
      );
    }
  }, [totalWords, setValue, watch]);

  // Handle Form Submission
  const onSubmit = handleSubmit(async (data) => {
    console.log('Submitting:', JSON.stringify(data.words, null, 2)); // Debugging
    try {
      const payload = { ...data };
      const response = currentCompetition
        ? await UpdateCompetition({ ...payload, id: currentCompetition.id })
        : await CreateCompetition(payload);

      if (response?.success) {
        enqueueSnackbar(currentCompetition ? 'Update success!' : 'Create success!', {
          variant: 'success',
        });
        router.push(paths.dashboard.competition.root);
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

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="contest_name" label="Competition Name" />
              <RHFTextField name="contest_description" label="Description" multiline rows={4} />
              <Box>
                <Typography>Start Time</Typography>
                <RHFTextField name="start_time" label="" type="datetime-local" />
              </Box>

              <Box>
                <Typography>End Time</Typography>
                <RHFTextField name="end_time" label="" type="datetime-local" />
              </Box>

              <RHFTextField name="prize_pool" label="Prize Pool" type="number" />

              <Box>
                <Typography variant="subtitle2">Select Schools</Typography>
                <SchoolsDropdown
                  value={values.school_ids}
                  onChange={(selectedSchools) => setValue('school_ids', selectedSchools)}
                />
              </Box>

              <RHFTextField name="max_slots" label="Max slots" type="number" />
              <RHFTextField name="filled_slots" label="Filled slots" type="number" />

              <RHFTextField
                name="total_words"
                label="Total Words"
                type="number"
                onChange={(e) => setValue('total_words', Math.max(1, Number(e.target.value) || 1))}
                onWheel={(e) => e.target.blur()} // Prevents changing value on scroll
              />

              <RHFTextField name="buffer_time" label="Buffer Time (in seconds)" type="number" />

              {/* Contest Status (Fixed to 'upcoming') */}
              <RHFTextField name="contest_status" label="Contest Status" value="Upcoming" disabled />

              {/* Dynamic Search Words */}
              {fields.map((item, index) => (
                <Box key={item.id} sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                  <Typography variant="subtitle1">Word {index + 1}</Typography>
                  <SearchWords
                    name={`words[${index}].word`}
                    value={watch(`words.${index}.word`) || ''} // Ensure controlled value
                    onChange={(selectedWord) => {
                      setValue(`words.${index}`, {
                        word: selectedWord?.word || '',
                        points: selectedWord?.points || '',
                        parts_of_speech: selectedWord?.parts_of_speech || '',
                        usage: selectedWord?.usage || '',
                        definition: selectedWord?.definition || '',
                        origin: selectedWord?.origin || '',
                      });
                    }}
                  />
                </Box>
              ))}

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
};
