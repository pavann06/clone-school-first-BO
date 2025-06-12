import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { CreateBanner, UpdateBanner } from 'src/api/banners';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import SchoolsDropdown from './school-dropdown';

export default function GradesNewEditForm({ currentBanner }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const NewBannerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
      school_id: Yup.string().required('School is required'),
    sections: Yup.array()
      .of(
        Yup.object().shape({
          section_name: Yup.string().required('Section name is required'),
          teacher_name: Yup.string().required('Teacher name is required'),
        })
      )
      .min(1, 'At least one section is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentBanner?.name || '',
       school_id: currentBanner?.school_id || '',
      sections: currentBanner?.sections || [{ section_name: '', teacher_name: '' }],
    }),
    [currentBanner]
  );

  const methods = useForm({
    resolver: yupResolver(NewBannerSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
     watch, 
     setValue,
    formState: { isSubmitting },
  } = methods;

  const selectedSchoolId = watch('school_id');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  const onSubmit = handleSubmit(async (data) => {
    let response = {};

    if (currentBanner) {
      data.id = currentBanner.id;
      response = await UpdateBanner(data);
    } else {
      response = await CreateBanner(data);
    }

    const { success, description } = response;

    if (success) {
      enqueueSnackbar(currentBanner ? 'Update success!' : 'Create success!');
      queryClient.invalidateQueries(['banners']);
      router.push(paths.dashboard.banners.root);
    } else {
      enqueueSnackbar(description);
      reset();
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Banner Form" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="name" label="Name" />

                <SchoolsDropdown
    value={selectedSchoolId}
    onChange={(val) => setValue('school_id', val)}
    error={!!methods.formState.errors.school_id}
    helperText={methods.formState.errors.school_id?.message}
  />

              <Stack spacing={2}>
                <Typography variant="subtitle2">Sections</Typography>

                {fields.map((item, index) => (
                  <Grid container spacing={2} key={item.id}>
                    <Grid xs={5}>
                      <RHFTextField name={`sections[${index}].section_name`} label="Section Name" />
                    </Grid>
                    <Grid xs={5}>
                      <RHFTextField name={`sections[${index}].teacher_name`} label="Teacher Name" />
                    </Grid>
                    <Grid xs={2} display="flex" alignItems="center">
                      <IconButton color="error" onClick={() => remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => append({ section_name: '', teacher_name: '' })}
                >
                  Add Section
                </Button>
              </Stack>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentBanner ? 'Create' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

GradesNewEditForm.propTypes = {
  currentBanner: PropTypes.any,
};
