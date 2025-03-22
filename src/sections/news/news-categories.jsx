// import React, { useEffect, useState, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
// import request from 'src/api/request';

// // Wrapping CategoriesDropdown with forwardRef
// const CategoriesDropdown = forwardRef(({ value, onChange }, ref) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await request.get('backoffice/news/categories');
//         if (response?.success && Array.isArray(response.data)) {
//           setCategories(response.data);
//         } else {
//           enqueueSnackbar('Failed to load categories', { variant: 'error' });
//         }
//       } catch (error) {
//         enqueueSnackbar('Error fetching categories', { variant: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [enqueueSnackbar]);

//   let menuContent;

//   if (loading) {
//     menuContent = <MenuItem disabled>Loading...</MenuItem>;
//   } else if (categories.length === 0) {
//     menuContent = <MenuItem disabled>No categories available</MenuItem>;
//   } else {
//     menuContent = categories.map((category) => (
//       <MenuItem key={category.id} value={category.display_name}>
//         {category.display_name}
//       </MenuItem>
//     ));
//   }

//   return (
//     <Select
//       ref={ref} // Pass the ref to the Select component
//       multiple
//       value={value}
//       onChange={(event) => onChange(event.target.value)}
//       renderValue={(selected) => (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//           {selected.join(', ')} {/* Render selected values as plain text */}
//         </Box>
//       )}
//       fullWidth
//     >
//       {menuContent}
//     </Select>
//   );
// });

// CategoriesDropdown.propTypes = {
//   value: PropTypes.array.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default CategoriesDropdown;



import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import request from 'src/api/request';
import { Box } from '@mui/material';

const CategoriesDropdown = ({ value, onChange }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      setCategories([]);
      return;
    }

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await request.get(`backoffice/search/newscategories?keyword=${encodeURIComponent(searchTerm)}`);
        
        if (response?.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
          enqueueSnackbar('No categories found', { variant: 'warning' });
        }
      } catch (error) {
        setCategories([]);
        enqueueSnackbar('Error fetching categories', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [searchTerm, enqueueSnackbar]);

  return (
    <Box>
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.display_name}
        loading={loading}
        value={categories.find((category) => category.id === value) || null}
        onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
        onChange={(event, newValue) => onChange(newValue ? newValue.id : null)}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" fullWidth />
        )}
      />
    </Box>
  );
};

CategoriesDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoriesDropdown;
