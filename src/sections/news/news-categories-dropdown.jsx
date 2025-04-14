


// import React, { useEffect, useState, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
// import request from 'src/api/request';

// const NewsCategoriesDropdown = forwardRef(({ value, onChange }, ref) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch categories from the API
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
//       <MenuItem key={category.id} value={category.id}>
//         {category.display_name}
//       </MenuItem>
//     ));
//   }

//   return (
//     <Select
//       ref={ref}
//       value={value}
//       onChange={(event) => onChange(event.target.value)}
//       fullWidth
//     >
//       {menuContent}
//     </Select>
//   );
// });

// NewsCategoriesDropdown.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default NewsCategoriesDropdown;

import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import request from 'src/api/request';
import PropTypes from 'prop-types';

const NewsCategoriesDropdown = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await request.get('backoffice/news/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);  // Pass the selected category's display_name to the parent
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        label="Category"
        onChange={handleCategoryChange}
        defaultValue=""
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : (
          categories.map((category) => (
            <MenuItem key={category.display_name} value={category.display_name}>
              {category.display_name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

NewsCategoriesDropdown.propTypes = {
    onCategoryChange: PropTypes.func.isRequired,  // Ensure it's a function and it's required
  };
  

export default NewsCategoriesDropdown;
