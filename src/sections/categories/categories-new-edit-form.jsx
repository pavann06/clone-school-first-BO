import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import React, { useMemo, useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

// UI Components (Material-UI)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';

// Internal Utilities
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';

import { CreateCategory, UpdateCategory } from 'src/api/categories';

import { useSnackbar } from 'src/components/snackbar';
// Form Components
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { Typography } from '@mui/material';

// Import date-fns for formatting
import { format } from 'date-fns';

// ----------------------------------------------------------------------

export default function CategoriesNewEditForm({ currentCategory }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  // Validation Schema for the form
  const CategorySchema = Yup.object().shape({
    display_name: Yup.string().required('Prompt is required'),

    icon_url: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      display_name: currentCategory?.display_name || '',

      icon_url: currentCategory?.icon_url || '',
    }),
    [currentCategory]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       icon_url: data.icon_url || null,
  //     };

  //     const response = currentCategory
  //       ? await UpdateCategory({ ...payload, id: currentCategory.id })
  //       : await CreateCategory(payload);

  //     if (response?.success) {
  //       enqueueSnackbar(currentCategory ? 'Update success!' : 'Create success!');
  //       router.push(paths.dashboard.categories.root);
  //       reset();
  //       return response;
  //     }

  //    // Extract error messages from response.data
  //    let errorMessage = "Operation failed";
  //    if (response?.data && typeof response.data === "object") {
  //     const errors = Object.values(response.data)
  //       .filter((msg) => Array.isArray(msg)) // Ensure it's an array
  //       .flat() // Flatten multiple error messages
  //       .join(", "); // Convert to a single string

  //     if (errors) {
  //       errorMessage = errors; // Assign extracted errors
  //     }
  //   }

  //   enqueueSnackbar(errorMessage, { variant: "error" });

  //     return response;
  //   } catch (error) {
  //     console.error('Error:', error);
  //     enqueueSnackbar('Operation failed');
  //     return null;
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        image: data.image || null,
      };
  
      const response = currentCategory
        ? await UpdateCategory({ ...payload, id: currentCategory.id })
        : await CreateCategory(payload);
  
      if (response?.success) {
        enqueueSnackbar(currentCategory ? "Update success!" : "Create success!");
        router.push(paths.dashboard.categories.root);
        reset();
        return response;
      }
  
      // Debugging: Log API response
      console.log("API Response:", response);
  
      // Extract error messages
      let errorMessage = "Operation failed";
  
      if (response?.data && typeof response.data === "object") {
        const errors = Object.values(response.data).flat(); // Flatten nested error arrays
  
        if (errors.length > 0) {
          errorMessage = errors.join(", "); // Combine error messages
        }
      }
  
      enqueueSnackbar(errorMessage, { variant: "error" });
  
      return response;
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Operation failed", { variant: "error" });
      return null;
    }
  });
  

  const handleUpload = useCallback(
    async (file) => {
      try {
        setIsUploading(true);
        const payload = {
          files: file,
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
      const file = acceptedFiles[0];
      if (file) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setValue('icon_url', fileWithPreview);

        const uploadedUrl = await handleUpload(file);
        if (uploadedUrl) {
          setValue('icon_url', uploadedUrl);
          enqueueSnackbar('Image uploaded successfully');
        }
      }
    },
    [setValue, enqueueSnackbar, handleUpload]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('icon_url', null); // Remove the image
  }, [setValue]);

  const handleRemoveAllFiles = useCallback(() => {
    setValue('icon_url', null); // Reset to no image
  }, [setValue]);

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
                <RHFTextField name="display_name" label="Display Name" />
              </Box>

              <Box>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Image</Typography>
                  <RHFUpload
                    thumbnail
                    name="icon_url"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    isLoading={isUploading}
                  />
                </Stack>
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentCategory ? 'Create Category' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CategoriesNewEditForm.propTypes = {
  currentCategory: PropTypes.any,
};
