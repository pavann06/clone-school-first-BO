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

import { CreateSpeciality, UpdateSpeciality } from 'src/api/speciality';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function SpecialitiesNewEditForm({ currentSpeciality }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewSpecialitySchema = Yup.object().shape({
    speciality_name: Yup.string().required('name is required'),
    logo: Yup.mixed(),
    description: Yup.string(),
    speciality_for: Yup.string().required('Speciality for is required'),
  });

  const defaultValues = useMemo(
    () => ({
      speciality_name: currentSpeciality?.speciality_name || '',
      logo: currentSpeciality?.logo ? [currentSpeciality.logo] : '',
      description: currentSpeciality?.description || '',
      speciality_for: currentSpeciality?.speciality_for || '',
    }),
    [currentSpeciality]
  );

  const methods = useForm({
    resolver: yupResolver(NewSpecialitySchema),
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
    if (currentSpeciality) {
      reset(defaultValues);
    }
  }, [currentSpeciality, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    // if update
    let response = {};
    if (currentSpeciality) {
      data.id = currentSpeciality.id;
      response = await UpdateSpeciality(data);
    }
    // if create
    else {
      response = await CreateSpeciality(data);
    }

    const { success, description } = response;

    //  creation success
    if (success) {
      enqueueSnackbar(currentSpeciality ? 'Update success!' : 'Create success!');
      // invalidate cache
      queryClient.invalidateQueries(['specialities']);

      // redirect to list
      router.push(paths.dashboard.specialities.root);
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
                <RHFTextField name="speciality_name" label="Speciality Name" />

                <RHFAutocomplete
                  name="speciality_for"
                  label="Speciality For"
                  options={['HOSPITAL', 'DOCTOR']}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) =>
                    setValue('speciality_for', value, { shouldValidate: true })
                  }
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                />

                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <RHFTextField name="description" label="Descrption" multiline rows={4} />

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
                {!currentSpeciality ? 'Create Speciality' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SpecialitiesNewEditForm.propTypes = {
  currentSpeciality: PropTypes.any,
};
