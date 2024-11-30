import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import request from 'src/api/request';
import { EmailInboxIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const { enqueueSnackbar } = useSnackbar();
  const password = useBoolean();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address'),
    otp: Yup.string().transform((originalValue, originalObject) => {
      const { emailSubmitted } = originalObject;

      if (emailSubmitted) {
        return originalValue
          .required('This field is required')
          .min(6, 'Must be at least 6 characters');
      }
      return originalValue;
    }),
    password: Yup.string().transform((originalValue, originalObject) => {
      const { emailSubmitted } = originalObject;

      if (emailSubmitted) {
        return originalValue
          .required('This field is required')
          .min(6, 'Must be at least 6 characters');
      }
      return originalValue;
    }),
    confirmPassword: Yup.string().transform((originalValue, originalObject) => {
      const { emailSubmitted } = originalObject;

      if (emailSubmitted && password) {
        return originalValue
          .required('This field is required')
          .oneOf([Yup.ref('password')], 'Passwords must match');
      }
      return originalValue;
    }),
  });

  const defaultValues = {
    otp: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmitEmail = handleSubmit(async (data) => {
    try {
      const response = await request.post('accounts/otp', data);
      setEmailSubmitted(true);
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

  const onSubmitOTP = handleSubmit(async (data) => {
    try {
      const response = await request.post('accounts/password', data);
      console.info('OTP DATA', data);
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

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      {!emailSubmitted ? (
        <>
          <RHFTextField
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            InputLabelProps={{ shrink: true }}
          />

          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmitEmail}
          >
            Send
          </LoadingButton>
        </>
      ) : (
        <>
          <RHFCode
            name="otp"
            label="Verification otp"
            placeholder="Enter 6-digit otp"
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            name="password"
            label="Password"
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
          />

          <RHFTextField
            name="confirmPassword"
            label="Confirm New Password"
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
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmitOTP}
          >
            Verify
          </LoadingButton>
        </>
      )}

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">
          {emailSubmitted ? 'Enter Verification otp' : 'Please check your email!'}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {emailSubmitted
            ? 'We have emailed a 6-digit confirmation otp , please enter the otp below to verify your email.'
            : 'We will send a 6-digit confirmation otp to your email. Please enter the otp below.'}
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={emailSubmitted ? onSubmitOTP : onSubmitEmail}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
