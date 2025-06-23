// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { useForm } from 'react-hook-form';
// import FormProvider from 'src/components/hook-form';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import { CreateStudent, UpdateStudent } from 'src/api/students';

// export default function StudentsNewEditForm() {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const [file, setFile] = useState(null);

//   const methods = useForm();
//   const { handleSubmit, formState: { isSubmitting }, reset } = methods;

//   const onSubmit = handleSubmit(async () => {
//     try {
//       if (!file) {
//         enqueueSnackbar('Please upload an Excel file', { variant: 'warning' });
//         return;
//       }

//       const formData = new FormData();
//       formData.append('file', file); // The backend expects this key

//       const response = await CreateStudent(formData);

//       console.log('API Response:', response);

//       if (response?.success) {
//         enqueueSnackbar('Excel uploaded successfully!', { variant: 'success' });
//         router.push(paths.dashboard.students.root);
//         reset();
//         setFile(null);
//       } else {
//         const errors = response?.response?.data?.data;
//         if (errors) {
//           enqueueSnackbar('Excel upload failed. Check the file format.', { variant: 'error' });
//         } else {
//           enqueueSnackbar(response?.error || 'Upload failed', { variant: 'error' });
//         }
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       enqueueSnackbar(error.message || 'Unexpected error occurred', { variant: 'error' });
//     }
//   });

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid xs={12} md={8}>
//           <Card>
//             <CardHeader title="Upload Students Excel Sheet" />
//             <Stack spacing={3} sx={{ p: 3 }}>
//               <input
//                 type="file"
//                 accept=".xls,.xlsx"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 loading={isSubmitting}
//               >
//                 Upload Excel
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// StudentsNewEditForm.propTypes = {
//   // currentStudent: PropTypes.object,
// };



import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
  Card,
  Stack,
  Box,
  Grid,
  CardHeader,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import request from 'src/api/request';
import { CreateStudent, UpdateStudent } from 'src/api/students';

export default function StudentsNewEditForm({ currentStudent }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = Boolean(currentStudent);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const StudentSchema = Yup.object().shape(
    isEdit
      ? {
          school: Yup.string().required(),
          student_id: Yup.string().required(),
          name: Yup.string().required(),
          image: Yup.string().url().nullable(),
          father_name: Yup.string().required(),
          mother_name: Yup.string().required(),
          dob: Yup.string().required(),
          mobile: Yup.string().required(),
          grade: Yup.string().required(),
          status: Yup.string().required(),
          address : Yup.string().required(),
          // address: Yup.object().shape({
          //   city: Yup.string().required('City is required'),
          //   state: Yup.string().required('State is required'),
          //   street: Yup.string().required('Street is required'),
          //   pincode: Yup.string()
          //     .matches(/^\d{6}$/, 'Pincode must be 6 digits')
          //     .required('Pincode is required'),
          // }),
        }
      : {} // No validation for Excel upload
  );

  const defaultValues = useMemo(
    () =>
      isEdit
        ? {
            school: currentStudent?.school || '',
            student_id: currentStudent?.student_id || '',
            name: currentStudent?.name || '',
            image: currentStudent?.image || '',
            father_name: currentStudent?.father_name || '',
            mother_name: currentStudent?.mother_name || '',
            dob: currentStudent?.dob || '',
            mobile: currentStudent?.mobile || '',
            grade: currentStudent?.grade || '',
            status: currentStudent?.status || '',
            address: currentStudent?.address || '',
            // address: {
            //   city: currentStudent?.address?.city || '',
            //   state: currentStudent?.address?.state || '',
            //   street: currentStudent?.address?.street || '',
            //   pincode: currentStudent?.address?.pincode || '',
            // },
          }
        : {},
    [currentStudent, isEdit]
  );

  const methods = useForm({
    resolver: yupResolver(StudentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentStudent) {
      reset(defaultValues);
    }
  }, [isEdit, currentStudent, defaultValues, reset]);

 


  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'background.paper',
      '& fieldset': {
        borderColor: 'grey.300',
      },
      '&:hover fieldset': {
        borderColor: 'grey.400',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
  };





const onSubmit = handleSubmit(async (data) => {
  try {
    if (!isEdit) {
      if (!file) {
        enqueueSnackbar('Please upload an Excel file', { variant: 'warning' });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await CreateStudent(formData);

      const success =
        response?.success === true ||
        response?.status === 200 ||
        response?.data?.success === true;

      if (success) {
        enqueueSnackbar('Students uploaded successfully!', { variant: 'success' });
        router.push(paths.dashboard.students.root);
        setFile(null);
      } else {
        enqueueSnackbar(response?.error || 'Upload failed', { variant: 'error' });
      }

    } else {
      const formattedData = {
        ...data,
        // address: [
        //   {
        //     city: data.address.city,
        //     state: data.address.state,
        //     street: data.address.street,
        //     pincode: data.address.pincode,
        //   },
        // ],
      };

      // const response = await UpdateStudent({ ...formattedData, id: currentStudent.id });
      // console.log('UpdateStudent Response:', response);

      // const success =
      //   response?.success === true ||
      //   response?.status === 200 ||
      //   response?.data?.success === true ||
      //   response?.data?.status === 'success';

      // if (success) {
      //   enqueueSnackbar('Student updated successfully!', { variant: 'success' });
      //   router.push(paths.dashboard.students.root);
      // } else {
      //   // Server-side validation error?
      //   const errors = response?.response?.data?.data;

      //   if (errors && typeof errors === 'object') {
      //     Object.entries(errors).forEach(([field, message]) => {
      //       setError(field, {
      //         message: Array.isArray(message) ? message[0] : message,
      //         type: 'server',
      //       });
      //     });
      //     enqueueSnackbar('Please correct the form errors', { variant: 'error' });
      //   } else {
      //     console.error('Update failed response:', response);
      //     enqueueSnackbar(response?.error || 'Update failed', { variant: 'error' });
      //   }
      // }
      const response = await UpdateStudent({ ...formattedData, id: currentStudent.id });
console.log('UpdateStudent Response:', response);

const success =
  response?.success === true ||
  response?.status === 'success' || 
  response?.message?.toLowerCase()?.includes('updated'); // optional fallback

if (success) {
  enqueueSnackbar('Student updated successfully!', { variant: 'success' });
  router.push(paths.dashboard.students.root);
} else {
  const errors = response?.response?.data?.data;

  if (errors && typeof errors === 'object') {
    Object.entries(errors).forEach(([field, message]) => {
      setError(field, {
        message: Array.isArray(message) ? message[0] : message,
        type: 'server',
      });
    });
    enqueueSnackbar('Please correct the form errors', { variant: 'error' });
  } else {
    console.error('Update failed response:', response);
    enqueueSnackbar(response?.error || 'Update failed', { variant: 'error' });
  }
}

    }
  } catch (error) {
    console.error('Submit Error:', error);
    enqueueSnackbar(error?.message || 'Unexpected error occurred', { variant: 'error' });
  }
});




  const handleUpload = useCallback(
    async (uploadFile) => {
      try {
        setIsUploading(true);
        const payload = {
          files: uploadFile,
        };
        const response = await request.UploadFiles(payload);

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

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const droppedFile = acceptedFiles[0];
      if (droppedFile) {
        const fileWithPreview = Object.assign(droppedFile, {
          preview: URL.createObjectURL(droppedFile),
        });

        if (droppedFile.type.startsWith('image/')) {
          setValue('image', fileWithPreview);
          const uploadedUrl = await handleUpload(droppedFile);
          if (uploadedUrl) {
            setValue('image', uploadedUrl);
            enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
          }
        } else if (droppedFile.type.startsWith('video/')) {
          setValue('video', fileWithPreview);
          const uploadedUrl = await handleUpload(droppedFile);
          if (uploadedUrl) {
            setValue('video', uploadedUrl);
            enqueueSnackbar('Video uploaded successfully', { variant: 'success' });
          }
        } else {
          enqueueSnackbar('Unsupported file type', { variant: 'error' });
        }
      }
    },
    [setValue, enqueueSnackbar, handleUpload]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('image', null); // Remove the image
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('image', null); // Reset to no image
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            <CardHeader title={isEdit ? 'Edit Student' : 'Upload Students via Excel'} />
            <Stack spacing={3} sx={{ p: 3 }}>
              {!isEdit ? (
                <>
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </>
              ) : (
                <>
                  <RHFTextField name="school" label="School ID"  sx={fieldStyles}  />
                  <RHFTextField name="student_id" label="Student ID"  sx={fieldStyles}  />
                  <RHFTextField name="name" label="Name"  sx={fieldStyles}  />

                  <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                    {/* Image Field */}
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2"> Image</Typography>
                      <RHFUpload
                        thumbnail
                        name="image"
                        
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        isLoading={isUploading}
                      />
                    </Stack>
                  </Box>

                  <RHFTextField name="father_name" label="Father's Name"  sx={fieldStyles}  />
                  <RHFTextField name="mother_name" label="Mother's Name"  sx={fieldStyles}  />
                  <RHFTextField
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                  {/* <RHFTextField name="address.city" label="City"  sx={fieldStyles}  />
                  <RHFTextField name="address.state" label="State"  sx={fieldStyles}  />
                  <RHFTextField name="address.street" label="Street"  sx={fieldStyles}  />
                  <RHFTextField name="address.pincode" label="Pincode"  sx={fieldStyles}  /> */}
                  <RHFTextField name="address" label="Address" />
                  <RHFTextField name="mobile" label="Mobile"  sx={fieldStyles}  />
                  <RHFTextField name="grade" label="Grade"  sx={fieldStyles}  />
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select native {...methods.register('status')}>
                     
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </FormControl>
                </>
              )}

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {isEdit ? 'Save Changes' : 'Upload Excel'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

StudentsNewEditForm.propTypes = {
  currentStudent: PropTypes.object,
};
