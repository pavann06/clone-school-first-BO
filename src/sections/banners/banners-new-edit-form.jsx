import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { CreateBanner, UpdateBanner } from 'src/api/banners';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form'; // Make sure this import is correctly pointing to your form components
// ----------------------------------------------------------------------

export default function BannersNewEditForm({ currentBanner }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewBannerSchema = Yup.object().shape({
    banner_name: Yup.string().required('name is required'),
    banner_image: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      banner_name: currentBanner?.banner_name || '',
      banner_image: currentBanner?.banner_image ? [currentBanner?.banner_image] : [],
    }),
    [currentBanner]
  );

  const methods = useForm({
    resolver: yupResolver(NewBannerSchema),
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
    // if update
    let response = {};
    if (currentBanner) {
      data.id = currentBanner.id;
      response = await UpdateBanner(data);
    }
    // if create
    else {
      response = await CreateBanner(data);
    }

    const { success, description } = response;

    //  creation success
    if (success) {
      enqueueSnackbar(currentBanner ? 'Update success!' : 'Create success!');
      // invalidate cache
      queryClient.invalidateQueries(['banners']);

      // redirect to list
      router.push(paths.dashboard.banners.root);
      return;
    }

    // creation failed
    enqueueSnackbar(description);
    reset();
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.banner_image || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('banner_image', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.banner_image]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered =
        values.banner_image && values.banner_image?.filter((file) => file !== inputFile);
      setValue('banner_image', filtered);
    },
    [setValue, values.banner_image]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('banner_image', []); // Removed dangling comma
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
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <RHFTextField name="banner_name" label="Banner Name" rows={1} />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Image</Typography>
                    <RHFUpload
                      multiple
                      thumbnail
                      name="banner_image"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      onUpload={() => console.info('ON UPLOAD')}
                    />
                  </Stack>
                </Box>
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }} // Align the button to the right
              >
                {!currentBanner ? 'Create Banner' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BannersNewEditForm.propTypes = {
  currentBanner: PropTypes.any,
};
