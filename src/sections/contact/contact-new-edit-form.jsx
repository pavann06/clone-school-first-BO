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
import FormProvider, { RHFTextField, RHFMultiSelect } from 'src/components/hook-form';

import ContactNewEditState from './contact-new-edit-state';

export default function ContactNewEditForm({ currentContact }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = useResponsive('up', 'md');

  const NewContactSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    description: Yup.string().notRequired(),
    role: Yup.mixed()
      .transform((originalValue) => {
        if (Array.isArray(originalValue)) {
          return originalValue.map((item) => item.trim());
        }
        if (typeof originalValue === 'string') {
          return originalValue.split(',').map((item) => item.trim());
        }
        return originalValue;
      })
      .required('Role is required'),
    sub_role: Yup.mixed()
    .transform((originalValue) => {
      if (Array.isArray(originalValue)) {
        return originalValue.map((item) => item.trim());
      }
      if (typeof originalValue === 'string') {
        return originalValue.split(',').map((item) => item.trim());
      }
      return originalValue;
    }),
    email: Yup.string().nullable().email('Invalid email address'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string().notRequired(),
    city: Yup.string().required('city is required'),
    state: Yup.string().required('State requried'),
    pincode: Yup.string()
      .matches(/^\d{6}$/, 'Enter PIN code')
      .required('PIN code is required'),
    gst_number: Yup.string().notRequired(),
  });

  const defaultValues = useMemo(
    () => ({
      full_name: currentContact?.full_name || '',
      description: currentContact?.description || '',
      role: currentContact?.role || [ ],
      sub_role: currentContact?.sub_role || [ ],
      email: currentContact?.email || '',
      mobile: currentContact?.mobile || '',
      address1: currentContact?.address1 || '',
      address2: currentContact?.address2 || '',
      city: currentContact?.city || '',
      state: currentContact?.state || '',
      pincode: currentContact?.pincode || '',
      gst_number: currentContact?.gst_number || '',
    }),
    [currentContact]
  );

  const methods = useForm({
    resolver: yupResolver(NewContactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const rolesOptions = [
    { value: 'CUSTOMER', label: 'CUSTOMER' },
    { value: 'SUPPLIER', label: 'SUPPLIER' },
  ];

  const subRolesOptions = {
    CUSTOMER: [{ value: 'DISTRIBUTOR', label: 'Distributor' }],
    SUPPLIER: [{ value: 'ORGANIZER', label: 'Organizer' }],
  };

  const getSubRolesOptions = (selectedRoles) => {
    const subRoles = selectedRoles.flatMap((role) => subRolesOptions[role] || []);
    return Array.from(new Set(subRoles));
  };

  useEffect(() => {
    if (currentContact) {
      reset(defaultValues);
    }
  }, [currentContact, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    data = Object.fromEntries(
      // eslint-disable-next-line unused-imports/no-unused-vars
      Object.entries(data).filter(([key, value]) => value !== '')
    );
    let response;
    if (currentContact) {
      data.contact_id = currentContact.id;
      response = await request.put('contacts', data);
    } else {
      response = await request.post('contacts', data);
    }
    const { success, description } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar(currentContact ? 'Update success!' : 'Create success!');

      // invalidate cache
      queryClient.invalidateQueries(['contacts']);

      router.push(paths.dashboard.contact.root);

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

                <RHFTextField name="description" label="Description" />

                <RHFMultiSelect name="role" label="Role" options={rolesOptions} checkbox />

                <RHFMultiSelect
                  name="sub_role"
                  label=" Sub Role"
                  options={getSubRolesOptions(methods.watch('role'))}
                  checkbox
                />

                <RHFTextField name="email" label="Email" />

                <RHFTextField name="mobile" label="Mobile" />

                <RHFTextField name="address1" label="Address 1" />

                <RHFTextField name="address2" label="Address 2" />

                <RHFTextField name="city" label="City" />

                <ContactNewEditState />

                <RHFTextField name="pincode" label="PinCode" />

                <RHFTextField name="gst_number" label="GST Number" />
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ alignSelf: 'flex-end' }}
              >
                {!currentContact ? 'Create Contact' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ContactNewEditForm.propTypes = {
  currentContact: PropTypes.any,
};
