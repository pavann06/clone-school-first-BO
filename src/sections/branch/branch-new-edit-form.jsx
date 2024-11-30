import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField} from 'src/components/hook-form';


export default function BranchNewEditForm({ currentBranch }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewBranchSchema = Yup.object().shape({
    branch_name: Yup.string().required('Branch name is required'),
    email: Yup.string().nullable().email('Invalid email address'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    address: Yup.string().required('Address is required'),
    gst_number: Yup.string().notRequired(),
  });

  const defaultValues = useMemo(
    () => ({
      branch_name: currentBranch?.branch_name || '',
      email: currentBranch?.email || '',
      mobile: currentBranch?.mobile || '',
      address: currentBranch?.address || '',
      gst_number: currentBranch?.gst_number || '',
    }),
    [currentBranch]
  );

  const methods = useForm({
    resolver: yupResolver(NewBranchSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentBranch) {
      reset(defaultValues);
    }
  }, [currentBranch, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    data = Object.fromEntries(
      // eslint-disable-next-line unused-imports/no-unused-vars
      Object.entries(data).filter(([key, value]) => value !== '')
    );
    let response;
    if (currentBranch) {
      data.branch_id = currentBranch.id;
      response = await request.put('clients/branch', data);
    } else {
      response = await request.post('clients/branch', data);
    }
    const { success, description } = response;
    console.log(response);

    // contact creation success
    if (success) {
      enqueueSnackbar(currentBranch ? 'Update success!' : 'Create success!');

      // invalidate cache
      queryClient.invalidateQueries(['branch']);

      router.push(paths.dashboard.branches.root);

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
                <RHFTextField name="branch_name" label="Name" />

                <RHFTextField name="email" label="Email" />

                <RHFTextField name="mobile" label="Mobile" />

                <RHFTextField name="address" label="Address" />

                <RHFTextField name="gst_number" label="GST Number" />
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentBranch ? 'Create Branch' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BranchNewEditForm.propTypes = {
  currentBranch: PropTypes.any,
};
