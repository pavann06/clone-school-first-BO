import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import request from 'src/api/request';
import { selectAuth } from 'src/redux/auth/selectors';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector(selectAuth);

  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    email: Yup.string(),
    old_password: Yup.string().required('Old Password is required'),
    new_password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('new_password')], 'Passwords must match'),
  });

  const defaultValues = {
    email:user?.email,
    old_password: '',
    new_password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await request.put('accounts/password', data);
      console.info('DATA', data);
      const { success } = response;
      if (success) {
        enqueueSnackbar('success!');
        return response;
      }
      enqueueSnackbar('failed!');

      return response;
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar(' failed from user!');
    }
    return null;
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <RHFTextField
          disabled
          name="email"
          label="Email"
          defaultValue={user?.email}
          InputLabelProps={{ shrink: true }}
        />
        <RHFTextField
          name="old_password"
          type={password.value ? 'text' : 'password'}
          label="Old Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="new_password"
          label="New Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              6+
            </Stack>
          }
        />

        <RHFTextField
          name="confirmPassword"
          type={password.value ? 'text' : 'password'}
          label="Confirm New Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
