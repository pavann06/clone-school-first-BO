// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import { useForm } from 'react-hook-form';
// import React, { useMemo, useState, } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import { MenuItem } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { CreateWord, UpdateWord } from 'src/api/word';

// import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';


// export default function WordNewEditForm({ currentWord }) {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const [isUploading, ] = useState(false);

//   const WordSchema = Yup.object().shape({
//     word: Yup.string().required('Word is required'),
//     definition: Yup.string().required('Definition is required'),
//     parts_of_speech: Yup.string().required('Parts of speech is required'),
//     usage: Yup.string().required('Usage is required'),
//     origin: Yup.string().required('Origin is required'),
//     status: Yup.string().required('Status is required'),
//     points: Yup.number().required('Points are required').min(0, 'Points must be non-negative'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       word: currentWord?.word || '',
//       definition: currentWord?.definition || '',
//       parts_of_speech: currentWord?.parts_of_speech || '',
//       usage: currentWord?.usage || '',
//       origin: currentWord?.origin || '',
//       status: currentWord?.status || 'Pending',
//       points: currentWord?.points || 0,
//     }),
//     [currentWord]
//   );

//   const methods = useForm({
//     resolver: yupResolver(WordSchema),
//     defaultValues,
//   });

//   const { reset, handleSubmit, formState: { isSubmitting } } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const response = currentWord
//         ? await UpdateWord({ ...data, id: currentWord.id })
//         : await CreateWord(data);

//       if (response?.success) {
//         enqueueSnackbar(currentWord ? 'Update success!' : 'Create success!', { variant: 'success' });
//         router.push(paths.dashboard.word.root);
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

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             <CardHeader  />
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <RHFTextField name="word" label="Word" />
//               <RHFTextField name="definition" label="Definition" multiline rows={3} />
//               <RHFTextField name="parts_of_speech" label="Parts Of Speech" />
//               <RHFTextField name="usage" label="Usage" multiline rows={2} />
//               <RHFTextField name="origin" label="Origin" />
//               <RHFSelect name="status" label="Status">
//                 <MenuItem value="Active">Active</MenuItem>
//                 <MenuItem value="Inactive">Inactive</MenuItem>
               
//               </RHFSelect>
//               <RHFTextField name="points" label="Points" type="number" />
//               <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting || isUploading}>
//                 {currentWord ? 'Save Changes' : 'Create Word'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// WordNewEditForm.propTypes = {
//   currentWord: PropTypes.any,
// };


import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import React, { useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Card,
  Stack,
  MenuItem,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CreateWord, UpdateWord } from 'src/api/word';

import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

export default function WordNewEditForm({ currentWord }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const isEdit = Boolean(currentWord);

  const WordSchema = Yup.object().shape(
    isEdit
      ? {
          word: Yup.string().required('Word is required'),
          definition: Yup.string().required('Definition is required'),
          parts_of_speech: Yup.string().required('Parts of speech is required'),
          usage: Yup.string().required('Usage is required'),
          origin: Yup.string().required('Origin is required'),
          status: Yup.string().required('Status is required'),
          points: Yup.number().required('Points are required').min(0, 'Points must be non-negative'),
        }
      : {
          xlsxFile: Yup.mixed()
            .test('required', 'Excel file is required', (value) => value && value.length > 0)
            .test('fileType', 'Only .xlsx files are allowed', (value) =>
              value && value[0]?.name.endsWith('.xlsx')
            ),
        }
  );

  const defaultValues = useMemo(
    () =>
      isEdit
        ? {
            word: currentWord?.word || '',
            definition: currentWord?.definition || '',
            parts_of_speech: currentWord?.parts_of_speech || '',
            usage: currentWord?.usage || '',
            origin: currentWord?.origin || '',
            status: currentWord?.status || 'Pending',
            points: currentWord?.points || 0,
          }
        : {
            xlsxFile: null,
          },
    [currentWord, isEdit]
  );

  const methods = useForm({
    resolver: yupResolver(WordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let response;

      if (isEdit) {
        response = await UpdateWord({ ...data, id: currentWord.id });
      } else {
        const file = data.xlsxFile?.[0];
        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        response = await CreateWord(formData);
        setIsUploading(false);
      }

      if (response?.success) {
        enqueueSnackbar(isEdit ? 'Update success!' : 'Upload success!', { variant: 'success' });
        router.push(paths.dashboard.word.root);
        reset();
        return response;
      }

      enqueueSnackbar(response?.error || 'Operation failed', { variant: 'error' });
      return response;
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
      return null;
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader
              title={isEdit ? 'Edit Word' : 'Upload Words via Excel'}
              subheader={isEdit ? 'Update word information' : 'Upload .xlsx file to create words'}
            />
            <Stack spacing={3} sx={{ p: 3 }}>
              {isEdit ? (
                <>
                  <RHFTextField name="word" label="Word" />
                  <RHFTextField name="definition" label="Definition" multiline rows={3} />
                  <RHFTextField name="parts_of_speech" label="Parts Of Speech" />
                  <RHFTextField name="usage" label="Usage" multiline rows={2} />
                  <RHFTextField name="origin" label="Origin" />
                  <RHFSelect name="status" label="Status">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </RHFSelect>
                  <RHFTextField name="points" label="Points" type="number" />
                </>
              ) : (
                <>
                  {/* <Typography variant="subtitle2">Upload Excel File (.xlsx)</Typography> */}
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => setValue('xlsxFile', e.target.files, { shouldValidate: true })}
                  />
                </>
              )}

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting || isUploading}>
                {isEdit ? 'Save Changes' : 'Upload Excel File'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

WordNewEditForm.propTypes = {
  currentWord: PropTypes.any,
};
