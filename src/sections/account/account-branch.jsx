import * as Yup from 'yup';
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

export default function AccountBranch({ profile }) {
  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    mobile: Yup.string(),
    address: Yup.string(),
    branch_name: Yup.string().required('name is requried'),
    is_main_branch: Yup.boolean(),
  });

  const defaultValues = {
    mobile: profile?.branch.mobile || '',
    is_main_branch: profile?.branch.is_main_branch || false,
    address: profile?.branch.address || '',
    branch_name: profile?.branch.branch_name || '',
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
              <RHFTextField name="branch_name" label="Branch Name" />
              <RHFTextField name="is_main_branch" label="Status" />
              <RHFTextField name="mobile" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
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
AccountBranch.propTypes = {
  profile: PropTypes.object,
};
