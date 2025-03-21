


// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import React, { useMemo, useState, useCallback } from 'react'; 
// import { yupResolver } from '@hookform/resolvers/yup';

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
// import request from 'src/api/request';
// import { CreateGroup , UpdateGroup } from 'src/api/groups';

// // Form Components
// import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';
// import { groupBy } from 'lodash';

// // ----------------------------------------------------------------------

// export default function GroupsNewEditForm({ currentGroup }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const [isUploading, setIsUploading] = useState(false);

//   const GroupSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     profile_image: Yup.mixed(),
//     logo: Yup.mixed(),
//     status: Yup.string().required('Status is required'),
//     group_type: Yup.string().required('Grouptype is reqiured'),
    
//   });

//   const defaultValues = useMemo(
//     () => ({
//       name: currentGroup?.name || '',
//       profile_image: currentGroup?.profile_image || '',
//       logo: currentGroup?.logo || '',
//       status: currentGroup?.status || 'Pending',
//       group_type: currentGroup?.group_type || '',
    
//     }),
//     [currentGroup]
//   );

//   const methods = useForm({
//     resolver: yupResolver(GroupSchema),
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
//     try {
//       const payload = {
//         ...data,
//         profile_image: data.profile_image || null,
//         logo: data.logo || null,
//       };

//       const response = currentGroup
//         ? await UpdateGroup({ ...payload, id: currentGroup.id })
//         : await CreateGroup(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentGroup ? 'Update success!' : 'Create success!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.groups.root);
//         reset();
//         return response;
//       }

//       // Display API error message in a red toast
//       const errorMessage = response?.error || 'Operation failed';
//       enqueueSnackbar(errorMessage, { variant: 'error' });
//       return response;
//     } catch (error) {
//       // Handle unexpected errors (e.g., network issues)
//       console.error('Error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
//       return null;
//     }
//   });



//   const handleUpload = useCallback(
//   async (file) => {
//     try {
//       setIsUploading(true);
//       const payload = {
//         files: file,
//       };
//       const response = await request.UploadFiles(payload);

//       if (response.success) {
//         return response.data[0].file_url;
//       }
//       throw new Error('Upload failed');
//     } catch (error) {
//       enqueueSnackbar('File upload failed', { variant: 'error' });
//       return null;
//     } finally {
//       setIsUploading(false);
//     }
//   },
//   [enqueueSnackbar]
// );




// const handleDropProfileImage = useCallback(
//   async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const fileWithPreview = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       // Check if file is an image
//       if (file.type.startsWith('image/')) {
//         const uploadedUrl = await handleUpload(file);
//         if (uploadedUrl) {
//           setValue('profile_image', uploadedUrl); // Set the profile image URL
//           enqueueSnackbar('Profile image uploaded successfully', { variant: 'success' });
//         }
//       } else {
//         enqueueSnackbar('Unsupported file type for profile image', { variant: 'error' });
//       }
//     }
//   },
//   [setValue, enqueueSnackbar, handleUpload]
// );

// const handleDropLogo = useCallback(
//   async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const fileWithPreview = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       // Check if file is an image
//       if (file.type.startsWith('image/')) {
//         const uploadedUrl = await handleUpload(file);
//         if (uploadedUrl) {
//           setValue('logo', uploadedUrl); // Set the logo URL
//           enqueueSnackbar('Logo uploaded successfully', { variant: 'success' });
//         }
//       } else {
//         enqueueSnackbar('Unsupported file type for logo', { variant: 'error' });
//       }
//     }
//   },
//   [setValue, enqueueSnackbar, handleUpload]
// );





// const handleRemoveFile = useCallback(() => {
//   setValue('profile_image', null); // Remove the profile image
// }, [setValue]);

// const handleRemoveAllFiles = useCallback(() => {
//   setValue('profile_image', null); // Reset to no profile image
//   setValue('logo', null); // Reset to no logo
// }, [setValue]);


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
//                 {/* Name Field */}
//                 <RHFTextField name="name" label="Name" />

//                 {/* Status Dropdown */}
//                 <RHFSelect name="status" label="Status">
                  
//                   <MenuItem value="Active">Active</MenuItem>
//                   <MenuItem value="Inactive">Inactive</MenuItem>
//                 </RHFSelect>

//                 <RHFSelect name="group_type" label="Group Type">
                  
//                   <MenuItem value="Public">Public</MenuItem>
//                   <MenuItem value="Internal">Internal</MenuItem>
//                 </RHFSelect>

            
//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <Stack spacing={1.5}>
//                     <Typography variant="subtitle2">Profile Image</Typography>
//                     <RHFUpload
//                       thumbnail
//                       name="profile_image"
//                       maxSize={3145728}
//                       onDrop={handleDropProfileImage}
//                       onRemove={handleRemoveFile}
//                       onRemoveAll={handleRemoveAllFiles}
//                       isLoading={isUploading}
//                     />
//                   </Stack>
//                 </Box>

//                 {/* Logo Field */}
//                 <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
//                   <Stack spacing={1.5}>
//                     <Typography variant="subtitle2">Logo</Typography>
//                     <RHFUpload
//                       thumbnail
//                       name="logo"
//                       maxSize={3145728}
//                       onDrop={handleDropLogo}
//                       onRemove={handleRemoveFile}
//                       onRemoveAll={handleRemoveAllFiles}
//                       isLoading={isUploading}
//                     />
//                   </Stack>
//                 </Box>

                 
//               </Box>

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {!currentGroup ? 'Create Group' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// GroupsNewEditForm.propTypes = {
//   currentGroup: PropTypes.any,
// };


import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useMemo, useState, useCallback } from 'react'; 
import { yupResolver } from '@hookform/resolvers/yup';

import { useSnackbar } from 'notistack';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import { CreateGroup , UpdateGroup } from 'src/api/groups';

// Form Components
import FormProvider, { RHFUpload, RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function GroupsNewEditForm({ currentGroup }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const GroupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    profile_image: Yup.mixed(),
    logo: Yup.mixed(),
    cover_pic: Yup.mixed(),
    status: Yup.string().required('Status is required'),
    group_type: Yup.string().required('Group type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentGroup?.name || '',
      profile_image: currentGroup?.profile_image || '',
      logo: currentGroup?.logo || '',
      cover_pic: currentGroup?.cover_pic || '',
      status: currentGroup?.status || 'Pending',
      group_type: currentGroup?.group_type || '',
    }),
    [currentGroup]
  );

  const methods = useForm({
    resolver: yupResolver(GroupSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, formState: { isSubmitting } } = methods;
  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        profile_image: data.profile_image || null,
        logo: data.logo || null,
        cover_pic: data.cover_pic || null,
      };

      const response = currentGroup
        ? await UpdateGroup({ ...payload, id: currentGroup.id })
        : await CreateGroup(payload);

      if (response?.success) {
        enqueueSnackbar(currentGroup ? 'Update success!' : 'Create success!', { variant: 'success' });
        router.push(paths.dashboard.groups.root);
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

  const handleUpload = useCallback(async (file) => {
    try {
      setIsUploading(true);
      const response = await request.UploadFiles({ files: file });
      if (response.success) return response.data[0].file_url;
      throw new Error('Upload failed');
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [enqueueSnackbar]);

  const handleImageUpload = useCallback(async (acceptedFiles, field) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      const uploadedUrl = await handleUpload(file);
      if (uploadedUrl) {
        setValue(field, uploadedUrl);
        enqueueSnackbar(`${field.replace('_', ' ')} uploaded successfully`, { variant: 'success' });
      }
    } else {
      enqueueSnackbar('Unsupported file type', { variant: 'error' });
    }
  }, [setValue, enqueueSnackbar, handleUpload]);

  const handleRemoveFile = useCallback((field) => setValue(field, null), [setValue]);
  const handleRemoveAllFiles = useCallback(() => {
    setValue('profile_image', null);
    setValue('logo', null);
    setValue('cover_pic', null);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Properties" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              <Box display="grid" columnGap={2} rowGap={3} gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
                <RHFTextField name="name" label="Name" />
                <RHFSelect name="status" label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </RHFSelect>
                <RHFSelect name="group_type" label="Group Type">
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Internal">Internal</MenuItem>
                </RHFSelect>
                {['profile_image', 'logo', 'cover_pic'].map((field) => (
                  <Box key={field} gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">{field.replace('_', ' ')}</Typography>
                      <RHFUpload
                        thumbnail
                        name={field}
                        maxSize={3145728}
                        onDrop={(files) => handleImageUpload(files, field)}
                        onRemove={() => handleRemoveFile(field)}
                        onRemoveAll={handleRemoveAllFiles}
                        isLoading={isUploading}
                      />
                    </Stack>
                  </Box>
                ))}
              </Box>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting || isUploading} sx={{ alignSelf: 'flex-end' }}>
                {!currentGroup ? 'Create Group' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

GroupsNewEditForm.propTypes = {
  currentGroup: PropTypes.any,
};
