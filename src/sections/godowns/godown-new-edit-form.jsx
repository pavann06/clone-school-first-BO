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
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import request from 'src/api/request';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField} from 'src/components/hook-form';


export default function GodownNewEditForm({ currentGodown }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = useResponsive('up', 'md');

  const NewGodownSchema = Yup.object().shape({
    godown_name: Yup.string().required('Godown name is required'),
    description: Yup.string().notRequired(),
    email: Yup.string().required().email('Invalid email address'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    address: Yup.string().required('Address  is required'),
  });

  const defaultValues = useMemo(
    () => ({
      godown_name: currentGodown?.godown_name || '',
      description: currentGodown?.description || '',
      email: currentGodown?.email || '',
      mobile: currentGodown?.mobile || '',
      address: currentGodown?.address || '',
    }),
    [currentGodown]
  );

  const methods = useForm({
    resolver: yupResolver(NewGodownSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentGodown) {
      reset(defaultValues);
    }
  }, [currentGodown, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    data = Object.fromEntries(
      // eslint-disable-next-line unused-imports/no-unused-vars
      Object.entries(data).filter(([key, value]) => value !== '')
    );
    let response;
    if (currentGodown) {
      data.godown_id = currentGodown.id;
      response = await request.put('godowns', data);
    } else {
      response = await request.post('godowns', data);
    }
    const { success, description } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar(currentGodown ? 'Update success!' : 'Create success!');

      // invalidate cache
      queryClient.invalidateQueries(['godowns']);

      router.push(paths.dashboard.godowns.root);

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
                <RHFTextField name="godown_name" label="Name" />

                <RHFTextField name="description" label="Description" />

                <RHFTextField name="email" label="Email" />

                <RHFTextField name="mobile" label="Mobile" />

                <RHFTextField name="address" label="Address" />

              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentGodown ? 'Create Godown' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

GodownNewEditForm.propTypes = {
  currentGodown: PropTypes.any,
};
