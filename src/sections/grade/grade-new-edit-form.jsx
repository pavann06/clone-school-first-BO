import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback } from 'react';

import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem, Button, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import request from 'src/api/request';
import { CreateGrade, UpdateGrade } from 'src/api/grade';

import FormProvider, {
  RHFUpload,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import SchoolsDropdown from './schools-dropdown';

// ----------------------------------------------------------------------

export default function GradeNewEditForm({ currentEdutainment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = useState(false);

  const EdutainmentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
   
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
     name : currentEdutainment?.name || '' ,
      sections: currentEdutainment?.sections || [{ section_name: '', teacher_name: '' }],
    }),
    [currentEdutainment]
  );

  const methods = useForm({
    resolver: yupResolver(EdutainmentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {


    try {
      const payload = {
        ...data,
       
      };

     

      const response = currentEdutainment
        ? await UpdateGrade({ ...payload, id: currentEdutainment.id })
        : await CreateGrade(payload);

      if (response?.success) {
        enqueueSnackbar(
          currentEdutainment
            ? 'Edutainment updated successfully!'
            : 'Edutainment created successfully!',
          { variant: 'success' }
        );
        router.push(paths.dashboard.edutainment.root);
        reset();
      } else {
        enqueueSnackbar('Operation failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error while submitting:', error);
      enqueueSnackbar('Something went wrong. Please check your inputs.', { variant: 'error' });
    }
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
                
                     <RHFTextField name="name" label="Name" />

               

             
              

                {/* Sections Dynamic Field */}
                <Box gridColumn={{ xs: 'span 1', md: 'span 2' }}>
                  <Typography variant="subtitle2">Sections</Typography>
                  <Stack spacing={2}>
                    {fields.map((field, index) => (
                      <Stack key={field.id} direction="row" spacing={2} alignItems="center">
                        <RHFTextField name={`sections.${index}.section_name`} label="Section Name" />
                        <RHFTextField name={`sections.${index}.teacher_name`} label="Teacher Name" />
                        <IconButton color="error" onClick={() => remove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => append({ section_name: '', teacher_name: '' })}
                    >
                      Add Section
                    </Button>
                  </Stack>
                </Box>

            

           

               
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || isUploading}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentEdutainment ? 'Create Edutainment' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

GradeNewEditForm.propTypes = {
  currentEdutainment: PropTypes.any,
};
