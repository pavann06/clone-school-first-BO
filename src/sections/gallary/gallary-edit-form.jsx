


// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import React, { useMemo, useState, useCallback } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useSnackbar } from 'notistack';

// import {
//   Box,
//   Card,
//   Stack,
//   MenuItem,
//   Typography,
//   Grid,
// } from '@mui/material';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { useRouter } from 'src/routes/hooks';
// import { useResponsive } from 'src/hooks/use-responsive';

// import FormProvider, { RHFUpload, RHFTextField, RHFSelect } from 'src/components/hook-form';
// import request from 'src/api/request';
// import { CreateGallary, UpdateGallary } from 'src/api/gallary';
// import { paths } from 'src/routes/paths';

// function parseArrayField(value) {
//   if (Array.isArray(value)) return value;
//   try {
//     const parsed = JSON.parse(value);
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// }

// export default function GallaryNewEditForm({ currentEdutainment }) {
//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();

//   const [isUploading, setIsUploading] = useState(false);

//   const EdutainmentSchema = Yup.object().shape({
//     event_name: Yup.string().when([], {
//       is: () => !currentEdutainment,
//       then: (schema) => schema.required('Event name is required'),
//       otherwise: (schema) => schema,
//     }),
//     description: Yup.string().when([], {
//       is: () => !currentEdutainment,
//       then: (schema) => schema.required('Description is required'),
//       otherwise: (schema) => schema,
//     }),
//     event_date: Yup.string().when([], {
//       is: () => !currentEdutainment,
//       then: (schema) => schema.required('Event date is required'),
//       otherwise: (schema) => schema,
//     }),
//     images: Yup.array().of(Yup.string()).when([], {
//       is: () => !currentEdutainment,
//       then: (schema) => schema.min(1, 'At least one image is required'),
//       otherwise: (schema) => schema,
//     }),
//     thumbnail_images: Yup.array().of(Yup.string()).min(1, 'Select at least one thumbnail image'),
//   });

//   const defaultValues = useMemo(() => ({
//     event_name: currentEdutainment?.event_name || '',
//     description: currentEdutainment?.description || '',
//     event_date: currentEdutainment?.event_date || '',
//     images: parseArrayField(currentEdutainment?.images),
//     thumbnail_images: parseArrayField(currentEdutainment?.thumbnail_images),
//   }), [currentEdutainment]);

//   const methods = useForm({
//     resolver: yupResolver(EdutainmentSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { isSubmitting },
//   } = methods;

//   const rawValues = watch();

//   const values = {
//     ...rawValues,
//     images: parseArrayField(rawValues.images),
//     thumbnail_images: parseArrayField(rawValues.thumbnail_images),
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const payload = {
//         event_name: data.event_name,
//         description: data.description,
//         event_date: data.event_date,
//         images: parseArrayField(data.images),
//         thumbnail_images: parseArrayField(data.thumbnail_images),
//       };

//       const response = currentEdutainment
//         ? await UpdateGallary({ ...payload, id: currentEdutainment.id })
//         : await CreateGallary(payload);

//       if (response?.success) {
//         enqueueSnackbar(currentEdutainment ? 'Event updated successfully!' : 'Event created successfully!', {
//           variant: 'success',
//         });
//         router.push(paths.dashboard.gallary.root);
//       } else {
//         enqueueSnackbar('Operation failed. Please try again.', { variant: 'error' });
//       }
//     } catch (error) {
//       console.error('Error while submitting:', error);
//       enqueueSnackbar('Something went wrong. Please check your inputs.', { variant: 'error' });
//     }
//   });

//   const handleUpload = useCallback(
//     async (file) => {
//       try {
//         setIsUploading(true);
//         const response = await request.UploadFiles({ files: file });
//         if (response.success) {
//           return response.data[0].file_url;
//         }
//         throw new Error('Upload failed');
//       } catch (error) {
//         enqueueSnackbar('File upload failed', { variant: 'error' });
//         return null;
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [enqueueSnackbar]
//   );

//   const handleDrop = useCallback(
//     async (acceptedFiles) => {
//       setIsUploading(true);
//       try {
//         const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
//         const uploadedUrls = await Promise.all(uploadPromises);
//         const validUrls = uploadedUrls.filter(Boolean);

//         if (validUrls.length > 0) {
//           setValue('images', [...(values.images || []), ...validUrls]);
//           enqueueSnackbar(`${validUrls.length} image(s) uploaded successfully`, { variant: 'success' });
//         }
//       } catch (error) {
//         console.error('Upload failed:', error);
//         enqueueSnackbar('Image upload failed', { variant: 'error' });
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [handleUpload, enqueueSnackbar, setValue, values.images]
//   );

//   const fieldStyles = {
//     '& .MuiOutlinedInput-root': {
//       borderRadius: 2,
//       backgroundColor: 'background.paper',
//       '& fieldset': { borderColor: 'grey.300' },
//       '&:hover fieldset': { borderColor: 'grey.400' },
//       '&.Mui-focused fieldset': { borderColor: 'primary.main' },
//     },
//   };

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card sx={{ p: 3 }}>
//             <Stack spacing={3}>
//               {!currentEdutainment && (
//                 <>
//                   <RHFTextField name="event_name" label="Event Name" sx={fieldStyles} />
//                   <RHFTextField name="description" label="Description" multiline rows={4} sx={fieldStyles} />
//                   <RHFTextField
//                     name="event_date"
//                     label="Event Date"
//                     type="date"
//                     InputLabelProps={{ shrink: true }}
//                     sx={fieldStyles}
//                   />

//                   <Stack spacing={1.5}>
//                     <Typography variant="subtitle2">Upload Images</Typography>
//                     <RHFUpload
//                       multiple
//                       thumbnail
//                       name="images"
//                       onDrop={handleDrop}
//                       isLoading={isUploading}
//                     />

//                     {Array.isArray(values.images) && values.images.length > 0 && (
//                       <Stack direction="row" spacing={2} flexWrap="wrap">
//                         {values.images.map((url) => (
//                           <Box
//                             key={url}
//                             sx={{
//                               position: 'relative',
//                               width: 100,
//                               height: 100,
//                               borderRadius: 2,
//                               overflow: 'hidden',
//                               border: '1px solid #ccc',
//                             }}
//                           >
//                             <img
//                               src={url}
//                               alt="Uploaded"
//                               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                             />
//                             <Box
//                               onClick={() => {
//                                 const updatedImages = values.images.filter((img) => img !== url);
//                                 const updatedThumbnails = values.thumbnail_images.filter((thumb) => thumb !== url);
//                                 setValue('images', updatedImages, { shouldValidate: true });
//                                 setValue('thumbnail_images', updatedThumbnails, { shouldValidate: true });
//                               }}
//                               sx={{
//                                 position: 'absolute',
//                                 top: 4,
//                                 right: 4,
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: '50%',
//                                 backgroundColor: 'rgba(0,0,0,0.6)',
//                                 color: '#fff',
//                                 fontSize: 14,
//                                 fontWeight: 'bold',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 zIndex: 10,
//                               }}
//                             >
//                               ×
//                             </Box>
//                           </Box>
//                         ))}
//                       </Stack>
//                     )}
//                   </Stack>
//                 </>
//               )}

//               <RHFSelect
//                 name="thumbnail_images"
//                 label="Select Thumbnail Images"
//                 multiple
//                 sx={fieldStyles}
//                 SelectProps={{
//                   multiple: true,
//                   renderValue: (selected) =>
//                     Array.isArray(selected)
//                       ? selected.map((val) => val.split('/').pop()).join(', ')
//                       : '',
//                 }}
//               >
//                 {(values.images || []).map((img) => (
//                   <MenuItem key={img} value={img}>
//                     <img src={img} alt="thumb" width={30} height={30} style={{ marginRight: 8 }} />
//                     {img.split('/').pop()}
//                   </MenuItem>
//                 ))}
//               </RHFSelect>

//               {Array.isArray(values.thumbnail_images) && values.thumbnail_images.length > 0 && (
//                 <Stack spacing={1}>
//                   <Typography variant="subtitle2">Selected Thumbnails</Typography>
//                   <Stack direction="row" spacing={1} flexWrap="wrap">
//                     {values.thumbnail_images.map((url) => (
//                       <Box
//                         key={url}
//                         sx={{
//                           position: 'relative',
//                           width: 60,
//                           height: 60,
//                           borderRadius: 1,
//                           overflow: 'hidden',
//                           border: '1px solid #ccc',
//                         }}
//                       >
//                         <img
//                           src={url}
//                           alt="Thumbnail"
//                           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                         />
//                         <Box
//                           onClick={() => {
//                             const updatedThumbnails = values.thumbnail_images.filter((thumb) => thumb !== url);
//                             setValue('thumbnail_images', updatedThumbnails, { shouldValidate: true });
//                           }}
//                           sx={{
//                             position: 'absolute',
//                             top: 2,
//                             right: 2,
//                             width: 18,
//                             height: 18,
//                             borderRadius: '50%',
//                             backgroundColor: 'rgba(0,0,0,0.6)',
//                             color: '#fff',
//                             fontSize: 12,
//                             fontWeight: 'bold',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             zIndex: 10,
//                           }}
//                         >
//                           ×
//                         </Box>
//                       </Box>
//                     ))}
//                   </Stack>
//                 </Stack>
//               )}

//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting || isUploading}
//                 sx={{ alignSelf: 'flex-end' }}
//               >
//                 {currentEdutainment ? 'Save Changes' : 'Create Event'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// GallaryNewEditForm.propTypes = {
//   currentEdutainment: PropTypes.any,
// };




import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useMemo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

import {
  Box,
  Card,
  Stack,
  MenuItem,
  Typography,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

import FormProvider, { RHFUpload, RHFTextField, RHFSelect } from 'src/components/hook-form';
import request from 'src/api/request';
import { CreateGallary, UpdateGallary } from 'src/api/gallary';
import { paths } from 'src/routes/paths';

function parseArrayField(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function GallaryNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    event_name: Yup.string().required('Event name is required'),
    description: Yup.string().required('Description is required'),
    event_date: Yup.string().required('Event date is required'),
    images: Yup.array().of(Yup.string()).min(1, 'At least one image is required'),
    thumbnail_images: Yup.array().of(Yup.string()).min(1, 'Select at least one thumbnail image'),
  });

  const defaultValues = useMemo(() => ({
    event_name: currentEdutainment?.event_name || '',
    description: currentEdutainment?.description || '',
    event_date: currentEdutainment?.event_date || '',
    images: parseArrayField(currentEdutainment?.images),
    thumbnail_images: parseArrayField(currentEdutainment?.thumbnail_images),
  }), [currentEdutainment]);

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isSubmitting },
  } = methods;

  const rawValues = watch();

  const values = {
    ...rawValues,
    images: parseArrayField(rawValues.images),
    thumbnail_images: parseArrayField(rawValues.thumbnail_images),
  };



// const onSubmit = handleSubmit(async (data) => {
//   try {
//     // ✅ Always use the latest 'images' state from watch()
//     const images = parseArrayField(watch('images'));
//     const thumbnail_images = parseArrayField(data.thumbnail_images);

//     const invalidThumbnails = thumbnail_images.filter((thumb) => !images.includes(thumb));
//     if (invalidThumbnails.length > 0) {
//       enqueueSnackbar('Some selected thumbnail images are not in the uploaded images.', {
//         variant: 'error',
//       });
//       return;
//     }

//     const payload = {
//       event_name: data.event_name,
//       description: data.description,
//       event_date: data.event_date,
//       images,
//       thumbnail_images,
//     };

//     const response = currentEdutainment
//       ? await UpdateGallary({ ...payload, id: currentEdutainment.id })
//       : await CreateGallary(payload);

//     if (response?.success) {
//       enqueueSnackbar(
//         currentEdutainment ? 'Event updated successfully!' : 'Event created successfully!',
//         { variant: 'success' }
//       );
//       router.push(paths.dashboard.gallary.root);
//     } else {
//       enqueueSnackbar(response?.description || 'Operation failed. Please try again.', {
//         variant: 'error',
//       });
//     }
//   } catch (error) {
//     console.error('Error while submitting:', error);
//     enqueueSnackbar('Something went wrong. Please check your inputs.', { variant: 'error' });
//   }
// });

const onSubmit = handleSubmit(async () => {
  try {
    const formValues = getValues();
    const images = parseArrayField(formValues.images);
    const thumbnail_images = parseArrayField(formValues.thumbnail_images);

    const invalidThumbnails = thumbnail_images.filter((thumb) => !images.includes(thumb));
    if (invalidThumbnails.length > 0) {
      enqueueSnackbar('Some selected thumbnail images are not in the uploaded images.', {
        variant: 'error',
      });
      return;
    }

    const payload = {
      event_name: formValues.event_name,
      description: formValues.description,
      event_date: formValues.event_date,
      images,
      thumbnail_images,
    };

    const response = currentEdutainment
      ? await UpdateGallary({ ...payload, id: currentEdutainment.id })
      : await CreateGallary(payload);

    if (response?.success) {
      enqueueSnackbar(
        currentEdutainment ? 'Event updated successfully!' : 'Event created successfully!',
        { variant: 'success' }
      );
      router.push(paths.dashboard.gallary.root);
    } else {
      enqueueSnackbar(response?.description || 'Operation failed. Please try again.', {
        variant: 'error',
      });
    }
  } catch (error) {
    console.error('Error while submitting:', error);
    enqueueSnackbar('Something went wrong. Please check your inputs.', { variant: 'error' });
  }
});




  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const response = await request.UploadFiles({ files: file });
        if (response.success) {
          return response.data[0].file_url;
        }
        throw new Error('Upload failed');
      } catch (error) {
        enqueueSnackbar('File upload failed', { variant: 'error' });
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [enqueueSnackbar]
  );

  // const handleDrop = useCallback(
  //   async (acceptedFiles) => {
  //     setIsUploading(true);
  //     try {
  //       const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
  //       const uploadedUrls = await Promise.all(uploadPromises);
  //       const validUrls = uploadedUrls.filter(Boolean);

  //       if (validUrls.length > 0) {
  //         setValue('images', [...(values.images || []), ...validUrls]);
  //         enqueueSnackbar(`${validUrls.length} image(s) uploaded successfully`, { variant: 'success' });
  //       }
  //     } catch (error) {
  //       console.error('Upload failed:', error);
  //       enqueueSnackbar('Image upload failed', { variant: 'error' });
  //     } finally {
  //       setIsUploading(false);
  //     }
  //   },
  //   [handleUpload, enqueueSnackbar, setValue, values.images]
  // );

  const handleDrop = useCallback(
  async (acceptedFiles) => {
    setIsUploading(true);
    try {
      const uploadPromises = acceptedFiles.map((file) => handleUpload(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(Boolean);

      if (validUrls.length > 0) {
        const existingImages = getValues('images') || [];
        setValue('images', [...existingImages, ...validUrls], { shouldValidate: true });
        enqueueSnackbar(`${validUrls.length} image(s) uploaded successfully`, { variant: 'success' });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      enqueueSnackbar('Image upload failed', { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  },
  [handleUpload, enqueueSnackbar, setValue, getValues]
);


  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'background.paper',
      '& fieldset': { borderColor: 'grey.300' },
      '&:hover fieldset': { borderColor: 'grey.400' },
      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    },
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="event_name" label="Event Name" sx={fieldStyles} />
              <RHFTextField name="description" label="Description" multiline rows={4} sx={fieldStyles} />
              <RHFTextField
                name="event_date"
                label="Event Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={fieldStyles}
              />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Upload Images</Typography>
                <RHFUpload
                  multiple
                  thumbnail
                  name="images"
                  onDrop={handleDrop}
                  isLoading={isUploading}
                />

                {Array.isArray(values.images) && values.images.length > 0 && (
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {values.images.map((url) => (
                      <Box
                        key={url}
                        sx={{
                          position: 'relative',
                          width: 100,
                          height: 100,
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '1px solid #ccc',
                        }}
                      >
                        <img
                          src={url}
                          alt="Uploaded"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Box
                          onClick={() => {
                            const updatedImages = values.images.filter((img) => img !== url);
                            const updatedThumbnails = values.thumbnail_images.filter((thumb) => thumb !== url);
                            setValue('images', updatedImages, { shouldValidate: true });
                            setValue('thumbnail_images', updatedThumbnails, { shouldValidate: true });
                          }}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                          }}
                        >
                          ×
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Stack>

              <RHFSelect
                name="thumbnail_images"
                label="Select Thumbnail Images"
                multiple
                sx={fieldStyles}
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) =>
                    Array.isArray(selected)
                      ? selected.map((val) => val.split('/').pop()).join(', ')
                      : '',
                }}
              >
                {(values.images || []).map((img) => (
                  <MenuItem key={img} value={img}>
                    <img src={img} alt="thumb" width={30} height={30} style={{ marginRight: 8 }} />
                    {img.split('/').pop()}
                  </MenuItem>
                ))}
              </RHFSelect>

              {Array.isArray(values.thumbnail_images) && values.thumbnail_images.length > 0 && (
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Selected Thumbnails</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {values.thumbnail_images.map((url) => (
                      <Box
                        key={url}
                        sx={{
                          position: 'relative',
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #ccc',
                        }}
                      >
                        <img
                          src={url}
                          alt="Thumbnail"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Box
                          onClick={() => {
                            const updatedThumbnails = values.thumbnail_images.filter((thumb) => thumb !== url);
                            setValue('thumbnail_images', updatedThumbnails, { shouldValidate: true });
                          }}
                          sx={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                          }}
                        >
                          ×
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              )}

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {currentEdutainment ? 'Save Changes' : 'Create Event'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

GallaryNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
