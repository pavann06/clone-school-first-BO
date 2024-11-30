import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useEffect, useCallback } from 'react';

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

import { CreateFeature, UpdateFeature } from 'src/api/feature';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField,RHFAutocomplete } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function FeaturesNewEditForm({ currentFeature }) {

  const queryClient = useQueryClient();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();


  const NewFeatureSchema = Yup.object().shape({
    feature_name: Yup.string().required('name is required'),
    logo: Yup.mixed(),
    description: Yup.string(),
    feature_type: Yup.string().required('Feature for is required'),
  });

  const defaultValues = useMemo(
    () => ({
      feature_name: currentFeature?.feature_name || '',
      logo: currentFeature?.logo ? [currentFeature.logo] : '',
      description: currentFeature?.description || '',
      feature_type: currentFeature?.feature_type || ''
    }),
    [currentFeature]
  );

  const methods = useForm({
    resolver: yupResolver(NewFeatureSchema),
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


  useEffect(() => {
    if (currentFeature) {
      reset(defaultValues);
    }
  }, [currentFeature, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {

    // if update
    let response = {}
    if(currentFeature){
      data.id = currentFeature.id
      response = await UpdateFeature(data);
    }
    // if create
    else{
      response = await CreateFeature(data)
    }

    const {success, description } = response

    //  creation success
    if (success){
      enqueueSnackbar(currentFeature ? 'Update success!' : 'Create success!');
      // invalidate cache
      queryClient.invalidateQueries(['features']);

      // redirect to list
      router.push(paths.dashboard.features.root);
      return;
    }

    // creation failed
    enqueueSnackbar(description);
    reset();

  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.logo || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('logo', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.logo]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.logo && values.logo?.filter((file) => file !== inputFile);
      setValue('logo', filtered);
    },
    [setValue, values.logo]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('logo', []);
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
                <RHFTextField name="feature_name" label="feature Name" />



                <RHFAutocomplete
                  name="feature_type"
                  label="Feature Type"
                  options={['AMENITY', 'SERVICE']}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => setValue('feature_type', value, { shouldValidate: true })}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                />


                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <RHFTextField
                    name="description"
                    label="Descrption"
                    multiline
                    rows={4}
                  />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Logo</Typography>
                    <RHFUpload
                      multiple
                      thumbnail
                      name="logo"
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
                {!currentFeature ? 'Create Feature' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

FeaturesNewEditForm.propTypes = {
  currentFeature: PropTypes.any,
};
