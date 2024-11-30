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
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import CitiesNewEditState from './cities-new-edit-state';

export default function CitiesNewEditForm({ currentCity }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = useResponsive('up', 'md');

  const NewCitiesSchema = Yup.object().shape({
    city_name: Yup.string().required('city name is required'),
    state: Yup.string().required('State requried'),
  });

  const defaultValues = useMemo(
    () => ({
      city_name: currentCity?.city_name || '',
      state: currentCity?.state || '',
    }),
    [currentCity]
  );

  const methods = useForm({
    resolver: yupResolver(NewCitiesSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentCity) {
      reset(defaultValues);
    }
  }, [currentCity, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    data = Object.fromEntries(
      // eslint-disable-next-line unused-imports/no-unused-vars
      Object.entries(data).filter(([key, value]) => value !== '')
    );
    let response;
    if (currentCity) {
      data.id = currentCity.id;
      response = await request.put('cities', data);
    } else {
      response = await request.post('cities', data);
    }
    const { success, description } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar(currentCity ? 'Update success!' : 'Create success!');

      // invalidate cache
      queryClient.invalidateQueries(['cities']);

      router.push(paths.dashboard.cities.root);

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
                <RHFTextField name="city_name" label="City Name" />

                <CitiesNewEditState />
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentCity ? 'Create City' : 'Save City'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CitiesNewEditForm.propTypes = {
  currentCity: PropTypes.any,
};
