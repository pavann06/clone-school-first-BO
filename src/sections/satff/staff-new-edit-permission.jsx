import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function PermissionsComponent({
  modulePermissions,
  selectedPermissions,
  setSelectedPermissions,
}) {
  const isFullScreen = useMediaQuery('(min-width:500px)'); 

  const stackDirection = isFullScreen ? 'row' : 'column';

  const handleCheckboxToggle = (permission) => {
    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions?.includes(permission)) {
        return prevPermissions.filter((perm) => perm !== permission);
      }
      return [...prevPermissions, permission];
    });
  };

  return (
    <>
      <Typography variant="h6" sx={{ borderBottom:'2px solid #ccc' }}>Permissions</Typography>
      {modulePermissions.map(({ module, permissions }) => (
        <div key={module}>
          <Typography variant="subtitle1">{module}</Typography>
          <Stack sx={{ borderBottom: '1px solid #ccc' }} direction={stackDirection}>
            {permissions.map(({ name, value }) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={selectedPermissions?.includes(value)}
                    onChange={() => handleCheckboxToggle(value)}
                    name={value}
                  />
                }
                label={name}
              />
            ))}
          </Stack>
        </div>
      ))}
    </>
  );
}

PermissionsComponent.propTypes = {
  modulePermissions: PropTypes.arrayOf(PropTypes.shape({
    module: PropTypes.string,
    permissions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })),
  })),
  selectedPermissions: PropTypes.array,
  setSelectedPermissions: PropTypes.func,
};
