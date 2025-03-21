// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useMemo } from 'react';
// import { useSnackbar } from 'notistack';

// // UI Components (Material-UI)
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// // Internal Utilities
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';

// // Form Components
// import FormProvider, { RHFTextField } from 'src/components/hook-form';
// import SearchWords from './search-words';

// export default function CompetitionNewEditForm({ currentCompetition }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const CompetitionSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     description: Yup.string().required('Description is required'),
//     total_words: Yup.number().min(1, 'Must be at least 1').required('Total words are required'),
//     prize_pool: Yup.number().min(0, 'Prize pool must be positive').required('Prize pool is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       name: currentCompetition?.name || '',
//       description: currentCompetition?.description || '',
//       total_words: currentCompetition?.total_words || 0,
//       prize_pool: currentCompetition?.prize_pool || 0,
//     }),
//     [currentCompetition]
//   );

//   const methods = useForm({
//     resolver: yupResolver(CompetitionSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = { ...data };

//       const response = currentCompetition
//         ? await UpdateEdutainment({ ...payload, id: currentCompetition.id })
//         : await CreateEdutainment(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentCompetition ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.competition.root);
//         reset();
//         return response;
//       }

//       const errorMessage = response?.error || 'Operation failed';
//       enqueueSnackbar(errorMessage, { variant: 'error' });
//       return Promise.reject(new Error(errorMessage));
//     } catch (error) {
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
//       return Promise.reject(error);
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
//               <RHFTextField name="total_words" label="Total Words" type="number" />
//               <RHFTextField name="prize_pool" label="Prize Pool" type="number" />
//               <SearchWords
//   name="search_words"
//   value={methods.watch('search_words') || ''} // Ensure it's not undefined
//   onChange={(val) => methods.setValue('search_words', val)}
// />

//               <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//                 {!currentCompetition ? 'Create Competition' : 'Save Changes'}
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

// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useEffect, useMemo } from 'react';
// import { useSnackbar } from 'notistack';

// // UI Components (Material-UI)
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

// export default function CompetitionNewEditForm({ currentCompetition }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   // Validation Schema
//   const CompetitionSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     description: Yup.string().required('Description is required'),
//     total_words: Yup.number().min(1, 'Must be at least 1').required('Total words are required'),
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
//       prize_pool: currentCompetition?.prize_pool || 0,
//       words: currentCompetition?.words || [
//         { word: '', points: '', parts_of_speech: '', usage: '', definition: '', origin: '' },
//       ],
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

//   // Watch total_words to dynamically update search word fields
//   const totalWords = watch('total_words');

//   // Handle Dynamic Fields
//   const { fields } = useFieldArray({
//     control,
//     name: 'words',
//   });

//   useEffect(() => {
//     if (fields.length !== totalWords) {
//       setValue(
//         'words',
//         Array.from(
//           { length: totalWords },
//           (_, i) =>
//             fields[i] || {
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
//   }, [totalWords, setValue, fields]);

//   // Handle Form Submission
//   const onSubmit = handleSubmit(async (data) => {
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

//       const errorMessage = response?.error || 'Operation failed';
//       enqueueSnackbar(errorMessage, { variant: 'error' });
//       return Promise.reject(new Error(errorMessage));
//     } catch (error) {
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
//       return Promise.reject(error);
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
//               <RHFTextField
//                 name="total_words"
//                 label="Total Words"
//                 type="number"
//                 onChange={(e) => setValue('total_words', Number(e.target.value))}
//               />

//               <RHFTextField name="prize_pool" label="Prize Pool" type="number" />

//               {/* Dynamic Search Words */}
//               {fields.map((item, index) => (
//                 <Box key={item.id} sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
//                   <Typography variant="subtitle1">Word {index + 1}</Typography>
//                   <SearchWords
//                     name={`words[${index}].word`}
//                     value={item.word || ''} // Ensure it never receives undefined
//                     onChange={(selectedWord) => {
//                       if (selectedWord) {
//                         setValue(`words[${index}]`, {
//                           word: selectedWord.word,
//                           points: selectedWord.points || '',
//                           parts_of_speech: selectedWord.parts_of_speech || '',
//                           usage: selectedWord.usage || '',
//                           definition: selectedWord.definition || '',
//                           origin: selectedWord.origin || '',
//                         });
//                       }
//                     }}
//                   />
//                 </Box>
//               ))}

//               <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//                 {!currentCompetition ? 'Create Competition' : 'Save Changes'}
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
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    total_words: Yup.number().min(1, 'Must be at least 1').required('Total words are required'),
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
  });

  // Default Values
  const defaultValues = useMemo(
    () => ({
      name: currentCompetition?.name || '',
      description: currentCompetition?.description || '',
      total_words: currentCompetition?.total_words || 0,
      prize_pool: currentCompetition?.prize_pool || 0,
      words: currentCompetition?.words || [],
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

  // useEffect(() => {
  //   const totalWordsValue = Number(totalWords) || 0; // Ensure it's a number
  //   const currentWords = watch('words') || [];

  //   if (totalWordsValue > currentWords.length) {
  //     // Add missing words
  //     const newWords = [
  //       ...currentWords,
  //       ...Array(totalWordsValue - currentWords.length).fill({
  //         word: '',
  //         points: '',
  //         parts_of_speech: '',
  //         usage: '',
  //         definition: '',
  //         origin: '',
  //       }),
  //     ];
  //     setValue('words', newWords);
  //   } else if (totalWordsValue < currentWords.length) {
  //     // Remove excess words
  //     setValue('words', currentWords.slice(0, totalWordsValue));
  //   }
  // }, [totalWords, setValue, watch]);

  useEffect(() => {
    const totalWordsValue = Number(totalWords) || 0;
    const currentWords = watch('words') || [];
  
    if (totalWordsValue !== currentWords.length) {
      setValue(
        'words',
        Array.from({ length: totalWordsValue }, (_, i) => currentWords[i] || {
          word: '',
          points: '',
          parts_of_speech: '',
          usage: '',
          definition: '',
          origin: '',
        })
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

      const errorMessage = response?.error || 'Operation failed';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return Promise.reject(new Error(errorMessage));
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return Promise.reject(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="name" label="Competition Name" />
              <RHFTextField name="description" label="Description" multiline rows={4} />
              <RHFTextField
                name="total_words"
                label="Total Words"
                type="number"
                onChange={(e) => setValue('total_words', Math.max(1, Number(e.target.value) || 1))}
                onWheel={(e) => e.target.blur()} // Prevents changing value on scroll
              />

              <RHFTextField name="prize_pool" label="Prize Pool" type="number" />

              {/* <Box>
              <Typography variant="subtitle2">Select Schools</Typography>
              <SchoolsDropdown
                value={values.school_ids}
                onChange={(selectedSchools) => setValue('school_ids', selectedSchools)}
              />
            </Box> */}

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
