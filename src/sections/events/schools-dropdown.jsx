

// import React, { useEffect, useState, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
// import request from 'src/api/request';

// const SchoolsDropdown = forwardRef(({ value, onChange }, ref) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await request.get('backoffice/school');
//         if (response?.success && Array.isArray(response.data)) {
//           setSchools(response.data);
//         } else {
//           enqueueSnackbar('Failed to load schools', { variant: 'error' });
//         }
//       } catch (error) {
//         enqueueSnackbar('Error fetching schools', { variant: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchools();
//   }, [enqueueSnackbar]);

//   const handleChange = (event) => {
//     onChange(event.target.value);
//   };

//   const renderSchoolOptions = () => {
//     if (loading) {
//       return <MenuItem disabled>Loading...</MenuItem>;
//     }

//     if (schools.length === 0) {
//       return <MenuItem disabled>No schools available</MenuItem>;
//     }

//     return schools.map((school) => (
//       <MenuItem key={school.id} value={school.id}>
//         {school.name}
//       </MenuItem>
//     ));
//   };

//   return (
//     <Select
//       ref={ref}
//       value={value}
//       onChange={handleChange}
//       fullWidth
//       displayEmpty
//     >
//       <MenuItem disabled value="">
//         Select a School
//       </MenuItem>
//       {renderSchoolOptions()}
//     </Select>
//   );
// });

// SchoolsDropdown.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
// };

// export default SchoolsDropdown;


import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import request from 'src/api/request';

const SchoolsDropdown = forwardRef(({ value, onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await request.get('backoffice/school');
        if (response?.success && Array.isArray(response.data)) {
          setSchools(response.data);
        } else {
          enqueueSnackbar('Failed to load schools', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching schools', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [enqueueSnackbar]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <CircularProgress size={20} />
        <Typography variant="body2">Loading schools...</Typography>
      </Box>
    );
  }

  return (
    <Select
      ref={ref}
      fullWidth
      displayEmpty
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <MenuItem disabled value="">
        Select a School
      </MenuItem>
      {schools.map((school) => (
        <MenuItem key={school.id} value={school.id}>
          {school.name}
        </MenuItem>
      ))}
    </Select>
  );
});

SchoolsDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default SchoolsDropdown;
