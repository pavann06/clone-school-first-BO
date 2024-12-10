// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { useMemo, useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useQueryClient } from '@tanstack/react-query';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { useResponsive } from 'src/hooks/use-responsive';

// import { CreateBanner, UpdateBanner } from 'src/api/banners';

// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form'; // Make sure this import is correctly pointing to your form components
// // ----------------------------------------------------------------------

// export default function EdutainmentNewEditForm({ currentBanner }) {
//   const queryClient = useQueryClient();

//   const router = useRouter();

//   const mdUp = useResponsive('up', 'md');

//   const { enqueueSnackbar } = useSnackbar();

//   const NewBannerSchema = Yup.object().shape({
//     banner_name: Yup.string().required('name is required'),
//     banner_image: Yup.mixed(),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       banner_name: currentBanner?.banner_name || '',
//       banner_image: currentBanner?.banner_image ? [currentBanner?.banner_image] : [],
//     }),
//     [currentBanner]
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewBannerSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const values = watch();

//   const onSubmit = handleSubmit(async (data) => {
//     // if update
//     let response = {};
//     if (currentBanner) {
//       data.id = currentBanner.id;
//       response = await UpdateBanner(data);
//     }
//     // if create
//     else {
//       response = await CreateBanner(data);
//     }

//     const { success, description } = response;

//     //  creation success
//     if (success) {
//       enqueueSnackbar(currentBanner ? 'Update success!' : 'Create success!');
//       // invalidate cache
//       queryClient.invalidateQueries(['banners']);

//       // redirect to list
//       router.push(paths.dashboard.banners.root);
//       return;
//     }

//     // creation failed
//     enqueueSnackbar(description);
//     reset();
//   });

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const files = values.banner_image || [];

//       const newFiles = acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       );

//       setValue('banner_image', [...files, ...newFiles], { shouldValidate: true });
//     },
//     [setValue, values.banner_image]
//   );

//   const handleRemoveFile = useCallback(
//     (inputFile) => {
//       const filtered =
//         values.banner_image && values.banner_image?.filter((file) => file !== inputFile);
//       setValue('banner_image', filtered);
//     },
//     [setValue, values.banner_image]
//   );

//   const handleRemoveAllFiles = useCallback(() => {
//     setValue('banner_image', []); // Removed dangling comma
//   }, [setValue]);

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Properties" />}

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
//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <RHFTextField name="banner_name" label="Banner Name" rows={1} />

//                   <Stack spacing={1.5}>
//                     <Typography variant="subtitle2">Image</Typography>
//                     <RHFUpload
//                       multiple
//                       thumbnail
//                       name="banner_image"
//                       maxSize={3145728}
//                       onDrop={handleDrop}
//                       onRemove={handleRemoveFile}
//                       onRemoveAll={handleRemoveAllFiles}
//                       onUpload={() => console.info('ON UPLOAD')}
//                     />
//                   </Stack>
//                 </Box>
//               </Box>
//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting}
//                 sx={{ alignSelf: 'flex-end' }} // Align the button to the right
//               >
//                 {!currentBanner ? 'Create Banner' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// BannersNewEditForm.propTypes = {
//   currentBanner: PropTypes.any,
// };
// External Libraries




import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback } from 'react'; // Combined import

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem } from '@mui/material';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';

// API and Services
import { CreateEdutainment, UpdateEdutainment } from 'src/api/edutainment';

// Form Components
import FormProvider, { RHFUpload, RHFTextField, RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EdutainmentNewEditForm({ currentEdutainment }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const EdutainmentSchema = Yup.object().shape({
    heading: Yup.string().required('Name is required'),
    image: Yup.mixed(),
    video: Yup.mixed().when('type', {
      is: 'video',
      then: Yup.mixed().required('Video is required for video type'),
    }),
    duration: Yup.string().when('type', {
      is: 'video',
      then: Yup.string().required('Duration is required for video type'),
    }),
    language: Yup.string().required('Language is required'),

    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      heading: currentEdutainment?.heading || '',
      type: currentEdutainment?.type || 'text', // Assuming 'text' is the default
      image: currentEdutainment?.image ? [currentEdutainment?.image] : [],
      video: currentEdutainment?.video || '',
      duration: currentEdutainment?.duration || '',
      language: currentEdutainment?.language || '',

      description: currentEdutainment?.description || '',
    }),
    [currentEdutainment]
  );

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.info('Submitting Form Data:', data);

    let response = {};
    if (currentEdutainment) {
      data.id = currentEdutainment.id;
      response = await UpdateEdutainment(data);
    } else {
      response = await CreateEdutainment(data);
    }

    console.info('API Response:', response);

    const { success, description } = response || {};

    if (success) {
      enqueueSnackbar(currentEdutainment ? 'Update success!' : 'Create success!');
      queryClient.invalidateQueries(['edutainments']);
      router.push(paths.dashboard.edutainments.root);
    } else {
      enqueueSnackbar(description || 'Something went wrong');
      reset();
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.image || [];
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue('edutainment_image', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.image]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.image && values.image?.filter((file) => file !== inputFile);
      setValue('image', filtered);
    },
    [setValue, values.image]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('image', []);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}

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
                {/* Type Dropdown */}
                <Box
                  columnGap={2}
                  rowGap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)', // Single column on small screens
                    md: 'repeat(2, 1fr)', // Three columns on medium and up
                  }}
                >
                  <RHFSelect name="field_type" label="Type">
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="image">Image</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="youtube">YouTube</MenuItem>
                  </RHFSelect>
                </Box>

                {/* Language, Heading, Description */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Stack spacing={2}>
                    {' '}
                    {/* Adjust spacing as needed */}
                    <RHFSelect name="language" label="Language">
                      <MenuItem value="Telugu">Telugu</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                    </RHFSelect>
                    <RHFTextField name="heading" label="Heading" />
                    <RHFTextField name="description" label="Description" />
                  </Stack>
                </Box>

                {/* Conditionally Render Image Field */}
                {(values.field_type === 'image' ||
                  values.field_type === 'video' ||
                  values.field_type === 'youtube') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    {/* Image Field */}
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Image</Typography>
                      <RHFUpload
                        multiple
                        thumbnail
                        name="image"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                      />
                    </Stack>
                  </Box>
                )}

                {/* Conditionally Render Video Fields */}
                {(values.field_type === 'video' || values.field_type === 'youtube') && (
                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    <Stack spacing={2}>
                      {' '}
                      {/* Adjust spacing as needed */}
                      <RHFTextField name="video" label="Video" />
                      <RHFTextField
                        name="duration"
                        label="Duration"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }} // Optional: Restrict to non-negative integers
                        rules={{
                          required: 'Duration is required',
                          validate: (value) =>
                            Number.isInteger(Number(value)) || 'Value must be an integer',
                        }}
                      />
                    </Stack>
                  </Box>
                )}
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Edutainment' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

EdutainmentNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
