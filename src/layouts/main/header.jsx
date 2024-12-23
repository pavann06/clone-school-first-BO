import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';

import { HEADER } from '../config-layout';
import LoginButton from '../common/login-button';
import HeaderShadow from '../common/header-shadow';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Badge
          sx={{
            [`& .${badgeClasses.badge}`]: {
              top: 8,
              right: -16,
            },
          }}
          style={{ paddingLeft: 30 }}
        >
          <Logo />
        </Badge>

        <Box sx={{ flexGrow: 1 }} />

        <Stack alignItems="right" direction={{ xs: 'row', md: 'row' }} justifyContent="flex-end">
          <Button variant="outlined" sx={{ mr: 1 }}>
            Contact Us
          </Button>

          <LoginButton />
        </Stack>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
