import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountClient({profile}) {
  const { enqueueSnackbar } = useSnackbar();

  const ClientSchema = Yup.object().shape({
    client_name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    logo: Yup.mixed().nullable().required('Avatar is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    license_number:Yup.mixed().required('license no. is requried'),
    gst_number:Yup.mixed().required('gst number is requried')
  });

  const defaultValues = {
    client_name:profile?.client.client_name || '',
    email: profile?.client.email || '',
    logo: profile?.client.logo || null,
    address: profile?.client.address || '',
    state: profile?.client.state || '',
    city: profile?.client.city || '',
    license_number:profile?.client.license_number || '',
    gst_number:profile?.client.gst_number || ''
  };

  const methods = useForm({
    resolver: yupResolver(ClientSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('logo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="logo"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="client_name" label="Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="license_number" label="License Number" />
              <RHFTextField name="gst_number" label="GST Number" />
                        
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

AccountClient.propTypes ={
    profile:PropTypes.object, 
}
