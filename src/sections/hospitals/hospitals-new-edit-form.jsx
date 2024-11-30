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

import { CreateHospital, UpdateHospital } from 'src/api/hospitals';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

import HospitalNewEditCity from './hospitals-new-edit-city';
import HospitalsNewEditSpecialities from './hospital-new-edit-specialities';
// ----------------------------------------------------------------------

export default function HospitalsNewEditForm({ currentHospital }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewHospitalSchema = Yup.object().shape({
    display_name: Yup.string().required('Display name is required'),
    mobile: Yup.number().min(1000000000).max(9999999999).required('Enter the mobile number'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    landline: Yup.string().matches(/^[0-9]{10}$/, 'Landline number must contain only digits'),
    address: Yup.string().required('Enter the address'),
    pincode: Yup.number().min(100000).max(999999).required('Enter the valid pincode'),
    city: Yup.string().required('Please Select The City'),
    speciality: Yup.array().required('Select the Speciality'),
    latitude: Yup.number().min(-90).max(90).required('Enter the Latitute'),
    longitude: Yup.number().min(-180).max(180).required('Enter the Longitute'),
    map_link: Yup.string().url('Invalid URL').required('Provide the Map Link'),
    website: Yup.string().url('Invalid URL').required('Provide the Website'),
    description: Yup.string().required('Please Enter the Description'),
    logo: Yup.mixed().required('Please Upload the Logo'),
    hospital_images: Yup.mixed().required('Please Upload the Hospital Images'),
  });

  const defaultValues = useMemo(
    () => ({
      display_name: currentHospital?.display_name || '',
      mobile: currentHospital?.mobile || '',
      email: currentHospital?.email || '',
      landline: currentHospital?.landline || '',
      address: currentHospital?.address || '',
      pincode: currentHospital?.pincode || '',

      city: currentHospital?.city || '',
      speciality: currentHospital?.speciality || [],
      latitude: currentHospital?.latitude || '',
      longitude: currentHospital?.longitude || '',
      map_link: currentHospital?.map_link || '',
      website: currentHospital?.website || '',
      description: currentHospital?.description || '',
      logo: currentHospital?.logo ? [currentHospital.logo] : [],
      hospital_images: currentHospital?.hospital_images || [],
    }),
    [currentHospital]
  );

  const methods = useForm({
    resolver: yupResolver(NewHospitalSchema),
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
    if (currentHospital) {
      reset(defaultValues);
    }
  }, [currentHospital, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    // if update
    let response = {};
    if (currentHospital) {
      data.id = currentHospital.id;
      response = await UpdateHospital(data);
    }
    // if create
    else {
      response = await CreateHospital(data);
    }

    const { success, description } = response;

    //  creation success
    if (success) {
      enqueueSnackbar(currentHospital ? 'Update success!' : 'Create success!');
      // invalidate cache
      queryClient.invalidateQueries(['backoffice/hospitals']);

      // redirect to list
      router.push(paths.dashboard.hospitals.root);
      return;
    }

    // creation failed
    enqueueSnackbar(description);
    // reset();
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

  const handleImagesDrop = useCallback(
    (acceptedFiles) => {
      const files = values.hospital_images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('hospital_images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.hospital_images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.logo && values.logo?.filter((file) => file !== inputFile);
      setValue('logo', filtered);
    },
    [setValue, values.logo]
  );

  const handleRemoveImagesFile = useCallback(
    (inputFile) => {
      const filtered =
        values.hospital_images && values.hospital_images?.filter((file) => file !== inputFile);
      setValue('hospital_images', filtered);
    },
    [setValue, values.hospital_images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('logo', []);
  }, [setValue]);

  const handleRemoveAllImagesFiles = useCallback(() => {
    setValue('hospital_images', []);
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
                <RHFTextField name="display_name" label="Display Name" multiline rows={1} />
                <RHFTextField name="mobile" label="Mobile" multiline rows={1} />
                <RHFTextField name="email" label="E-Mail" multiline rows={1} />

                <RHFTextField name="landline" label="landline" multiline rows={1} />
                <RHFTextField name="address" label="Address" multiline rows={2} />
                <RHFTextField name="pincode" label="Pincode" multiline rows={1} />

                <HospitalNewEditCity currentHospital={currentHospital} />
                <HospitalsNewEditSpecialities currentHospital={currentHospital} />

                <RHFTextField name="latitude" label="Latitude" multiline rows={1} />
                <RHFTextField name="longitude" label="Longitude" multiline rows={1} />
                <RHFTextField name="map_link" label="Map Link" multiline rows={1} />
                <RHFTextField name="website" label="Website" multiline rows={1} />

                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <RHFTextField name="description" label="Description" multiline rows={4} />

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
                  <Stack spacing={1.5} >
                    <Typography variant="subtitle2">Hospital Images</Typography>
                    <RHFUpload
                      multiple
                      thumbnail
                      name="hospital_images"
                      maxSize={3145728}
                      onDrop={handleImagesDrop}
                      onRemove={handleRemoveImagesFile}
                      onRemoveAll={handleRemoveAllImagesFiles}
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
                {!currentHospital ? 'Create Hospital' : 'Update hospital'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

HospitalsNewEditForm.propTypes = {
  currentHospital: PropTypes.any,
};
