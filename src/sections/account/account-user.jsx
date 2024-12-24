import * as Yup from 'yup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountUser({ profile }) {
  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    mobile: Yup.string().required('Phone number is required'),
    is_active: Yup.boolean(),
    last_login: Yup.mixed().required('date requried'),
    role: Yup.string().required('role requried'),
  });

  const defaultValues = {
    email: profile?.user.email || '',
    mobile: profile?.user.mobile || '',
    is_active: profile?.user.is_active || true,
    last_login: profile?.user.last_login
      ? format(new Date(profile?.user.last_login), 'dd-MM-yyyy')
      : '',
    role: profile?.user.role[0] || [],
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
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

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
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
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="mobile" label="Phone Number" />
              <RHFTextField name="is_active" label="Status" />
              <RHFTextField name="last_login" label="Last Login" />
              <RHFTextField name="role" label="Role" />
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
AccountUser.propTypes = {
  profile: PropTypes.object,
};
