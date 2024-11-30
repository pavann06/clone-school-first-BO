import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { selectUser } from 'src/redux/auth/selectors';
import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function PermissionBasedGuard({ hasContent, permissions, children, sx }) {
  // Logic here to get current user role
  const { custom_permissions } =  useSelector(selectUser);

  const existingPermissions = custom_permissions || [];

  if (Array.isArray(permissions) && permissions.length > 0) {
    const allPermissionsPresent = permissions.every(permission => existingPermissions.includes(permission));

    if (!allPermissionsPresent) {
      return hasContent ? (
        <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Permission Denied
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              You do not have permission to access this page
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <ForbiddenIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>
        </Container>
      ) : null;
    }
  }

  return <> {children} </>;
}

PermissionBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  permissions: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.object,
};
