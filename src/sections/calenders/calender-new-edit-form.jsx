// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useQueryClient } from '@tanstack/react-query';
// import React, { useMemo, useCallback } from 'react';

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
// import { useSnackbar } from 'src/components/snackbar';
// import { CreateCalender, UpdateCalender } from 'src/api/calender-module';

// // Form Components
// import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function CalenderNewEditForm({ currentCalender }) {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const CalenderSchema = Yup.object().shape({
//     date: Yup.string().required('Date is required'),
//     prompt: Yup.string().required('Prompt is required'),
//     benefit: Yup.string().required('Benefit is required'),
//     youtube_video_url: Yup.string().url('Must be a valid URL').required('YouTube Video URL is required'),
//     description: Yup.string().required('Description is required'),
//     image: Yup.mixed().test(
//       'fileSize',
//       'File size is too large',
//       (value) => !value || (value && value.size <= 10145728) // 10MB limit
//     ),
//   });

//   const defaultValues = useMemo(() => ({
//     date: currentCalender?.date || '',
//     prompt: currentCalender?.prompt || '',
//     benefit: currentCalender?.benefit || '',
//     youtube_video_url: currentCalender?.youtube_video_url || '',
//     description: currentCalender?.description || '',
//     image: typeof currentCalender?.image === 'string' ? currentCalender.image : '', // Always ensure it's a string
//   }), [currentCalender]);
  

//   const methods = useForm({
//     resolver: yupResolver(CalenderSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     console.info('Submitting Form Data:', data);

//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });

//     let response = {};
//     if (currentCalender) {
//       formData.append('id', currentCalender.id);
//       response = await UpdateCalender(formData);
//     } else {
//       response = await CreateCalender(formData);
//     }

//     console.info('API Response:', response);

//     const { success, description } = response || {};
//     if (success) {
//       enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
//       queryClient.invalidateQueries(['edutainments']);
//       router.push(paths.dashboard.calender.root);
//     } else {
//       enqueueSnackbar(description || 'Something went wrong');
//       reset();
//     }
//   });

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const newFile = acceptedFiles[0];
//       if (newFile) {
//         const fileWithPreview = Object.assign(newFile, {
//           preview: URL.createObjectURL(newFile),
//         });
//         setValue('image', fileWithPreview, { shouldValidate: true });
//       }
//     },
//     [setValue]
//   );

//   //   const handleEditRow = useCallback(
// //     (id) => {
// //       router.push(paths.dashboard.hospitals.edit(id));
// //     },
// //     [router]
// //   );

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
//               <RHFTextField name="date" label="Date" type="date" />
//                 <RHFTextField name="prompt" label="Prompt" />
//                 <RHFTextField name="benefit" label="Benefit" />
//                 <RHFTextField name="youtube_video_url" label="YouTube Video URL" />
//                 <RHFTextField name="description" label="Description" multiline rows={4} />
//                 <RHFUpload
//                   name="image"
//                   label="Upload Image"
//                   maxSize={3145728}
//                   onDrop={handleDrop}
//                 />
                
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentCalender ? 'Create Calendar' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// CalenderNewEditForm.propTypes = {
//   currentCalender: PropTypes.any,
// };

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useCallback } from 'react';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { CreateCalender, UpdateCalender } from 'src/api/calender-module';

// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CalenderNewEditForm({ currentCalender }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Validation Schema for the form
  const CalenderSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    prompt: Yup.string().required('Prompt is required'),
    benefit: Yup.string().required('Benefit is required'),
    youtube_video_url: Yup.string().url('Must be a valid URL').required('YouTube Video URL is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().test(
      'fileSize',
      'File size is too large',
      (value) => !value || (value && value.size <= 10145728) // 10MB limit
    ),
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    const month = `${(date.getMonth() + 1) < 10 ? '0' : ''}${(date.getMonth() + 1)}`;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Date in DD-MM-YYYY format
  };

  const defaultValues = useMemo(() => ({
    date: currentCalender?.date ? formatDate(currentCalender.date) : '',
    prompt: currentCalender?.prompt || '',
    benefit: currentCalender?.benefit || '',
    youtube_video_url: currentCalender?.youtube_video_url || '',
    description: currentCalender?.description || '',
    image: typeof currentCalender?.image === 'string' ? currentCalender.image : '',
  }), [currentCalender]);
  

  const methods = useForm({
    resolver: yupResolver(CalenderSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    console.info('Submitting Form Data:', data);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Convert date to DD-MM-YYYY format before sending it
    const formattedDate = formatDate(data.date);
    formData.set('date', formattedDate); // Set formatted date

    let response = {};
    if (currentCalender) {
      formData.append('id', currentCalender.id);
      response = await UpdateCalender(formData);
    } else {
      response = await CreateCalender(formData);
    }

    console.info('API Response:', response);

    const { success, description } = response || {};
    if (success) {
      enqueueSnackbar(currentCalender ? 'Update success!' : 'Create success!');
      queryClient.invalidateQueries(['edutainments']);
      router.push(paths.dashboard.calender.root);
    } else {
      enqueueSnackbar(description || 'Something went wrong');
      reset();
    }
  });

  // Handle file upload
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        const fileWithPreview = Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });
        setValue('image', fileWithPreview, { shouldValidate: true });
      }
    },
    [setValue]
  );

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
                <RHFTextField name="date" label="Date" type="date" />
                <RHFTextField name="prompt" label="Prompt" />
                <RHFTextField name="benefit" label="Benefit" />
                <RHFTextField name="youtube_video_url" label="YouTube Video URL" />
                <RHFTextField name="description" label="Description" multiline rows={4} />
                <RHFUpload
                  name="image"
                  label="Upload Image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentCalender ? 'Create Calendar' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CalenderNewEditForm.propTypes = {
  currentCalender: PropTypes.any,
};
