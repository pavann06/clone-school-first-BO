// import React, { useEffect, useState, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Chip from '@mui/material/Chip';
// import Box from '@mui/material/Box';
// import request from 'src/api/request';

// const GradesDropdown = forwardRef(({ value, onChange }, ref) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGrades = async () => {
//       try {
//         const response = await request.get('backoffice/grade');
//         if (response?.success && Array.isArray(response.data)) {
//           setGrades(response.data);
//         } else {
//           enqueueSnackbar('Failed to load grades', { variant: 'error' });
//         }
//       } catch (error) {
//         enqueueSnackbar('Error fetching grades', { variant: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGrades();
//   }, [enqueueSnackbar]);

//   const handleChange = (event) => {
//     onChange(event.target.value);
//   };

//   const renderGradeOptions = () => {
//     if (loading) {
//       return <MenuItem disabled>Loading...</MenuItem>;
//     }

//     if (grades.length === 0) {
//       return <MenuItem disabled>No grades available</MenuItem>;
//     }

//     return grades.map((grade) => (
//       <MenuItem key={grade.id} value={grade.id}>
//         {grade.name}
//       </MenuItem>
//     ));
//   };

//   return (
//     <Select
//       ref={ref}
//       multiple
//       value={value}
//       onChange={handleChange}
//       fullWidth
//       displayEmpty
//       renderValue={(selected) => (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//           {selected.map((id) => {
//             const selectedGrade = grades.find((g) => g.id === id);
//             return selectedGrade ? (
//               <Chip key={id} label={selectedGrade.name} />
//             ) : null;
//           })}
//         </Box>
//       )}
//     >
//       <MenuItem disabled value="">
//         Select Grades
//       </MenuItem>
//       {renderGradeOptions()}
//     </Select>
//   );
// });

// GradesDropdown.propTypes = {
//   value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default GradesDropdown;


import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import request from 'src/api/request';

const GradesDropdown = forwardRef(({ value = [], onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await request.get('backoffice/grade');
        if (response?.success && Array.isArray(response.data)) {
          setGrades(response.data);
        } else {
          enqueueSnackbar('Failed to load grades', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching grades', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [enqueueSnackbar]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const renderGradeOptions = () => {
    if (loading) {
      return (
        <MenuItem disabled>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={18} />
            Loading...
          </Box>
        </MenuItem>
      );
    }

    if (grades.length === 0) {
      return <MenuItem disabled>No grades available</MenuItem>;
    }

    return grades.map((grade) => (
      <MenuItem key={grade.id} value={grade.id}>
        {grade.name}
      </MenuItem>
    ));
  };

  return (
    <Select
      ref={ref}
      multiple
      value={value || []}
      onChange={handleChange}
      fullWidth
      displayEmpty
      renderValue={(selected = []) =>
        selected.length === 0 ? (
          <em>Select Grades</em>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((id) => {
              const selectedGrade = grades.find((g) => g.id === id);
              return selectedGrade ? (
                <Chip key={id} label={selectedGrade.name} />
              ) : null;
            })}
          </Box>
        )
      }
    >
      <MenuItem disabled value="">
        Select Grades
      </MenuItem>
      {renderGradeOptions()}
    </Select>
  );
});

GradesDropdown.displayName = 'GradesDropdown';

GradesDropdown.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GradesDropdown;

