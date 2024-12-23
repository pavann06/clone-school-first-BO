import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';

import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import PermissionsComponent from './staff-new-edit-permission';

export default function StaffNewEditForm({ currentStaff }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = useResponsive('up', 'md');

  // fetching permissions
  const { data, isLoading } = useQuery({
    queryKey: ['staff', 'roles', 'permissions'],
    queryFn: () => request.get('/branch/staff/roles/permissions'),
    staleTime: 12 * 60 * 60 * 1000,
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    setSelectedPermissions(currentStaff ? currentStaff.custom_permissions : []);
  }, [currentStaff]);

  const NewStaffSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    email: Yup.string().nullable().email('Invalid email address'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    password: Yup.string(),
    is_active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      full_name: currentStaff?.full_name || '',
      email: currentStaff?.email || '',
      mobile: currentStaff?.mobile || '',
      password: currentStaff?.password || '',
      is_active: currentStaff?.is_active !== undefined ? currentStaff.is_active : true,
    }),
    [currentStaff]
  );

  const methods = useForm({
    resolver: yupResolver(NewStaffSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentStaff) {
      reset(defaultValues);
    }
  }, [currentStaff, defaultValues, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    formData = Object.fromEntries(
      // eslint-disable-next-line unused-imports/no-unused-vars
      Object.entries(formData).filter(([key, value]) => value !== '')
    );
    formData.custom_permissions = selectedPermissions;
    let response;
    if (currentStaff) {
      formData.user_id = currentStaff.id;
      response = await request.put('branch/staff', formData);
    } else {
      response = await request.post('branch/staff', formData);
    }
    const { success, description } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar(currentStaff ? 'Update success!' : 'Create success!');

      // invalidate cache
      queryClient.invalidateQueries(['staff']);

      router.push(paths.dashboard.staff.root);

      return;
    }

    // contact creation failed
    enqueueSnackbar(description);
    reset();
  });

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
                <RHFTextField name="full_name" label="Name" />

                <RHFTextField name="email" label="Email" />

                <RHFTextField name="mobile" label="Mobile" />

                <RHFTextField name="password" label="Password" />

                <RHFSelect name="is_active" label="Status">
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </RHFSelect>
              </Box>

              {isLoading ? (
                <LoadingScreen />
              ) : (
                <PermissionsComponent
                  modulePermissions={data?.info?.module_permissions}
                  selectedPermissions={selectedPermissions}
                  setSelectedPermissions={setSelectedPermissions}
                />
              )}
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentStaff ? 'Create Staff' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

StaffNewEditForm.propTypes = {
  currentStaff: PropTypes.any,
};
