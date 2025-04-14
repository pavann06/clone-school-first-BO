


// import React, { useState, useEffect } from 'react';
// import { MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
// import request from 'src/api/request';
// import PropTypes from 'prop-types';

// const NewsCategoriesDropdown = ({ onCategoryChange }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await request.get('backoffice/news/categories');
//         setCategories(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryChange = (event) => {
//     onCategoryChange(event.target.value);  // Pass the selected category's display_name to the parent
//   };

//   return (
//     <FormControl fullWidth>
//       <InputLabel>Category</InputLabel>
//       <Select
//         label="Category"
//         onChange={handleCategoryChange}
//         defaultValue=""
//       >
//         {loading ? (
//           <MenuItem disabled>
//             <CircularProgress size={24} />
//           </MenuItem>
//         ) : (
//           categories.map((category) => (
//             <MenuItem key={category.display_name} value={category.display_name}>
//               {category.display_name}
//             </MenuItem>
//           ))
//         )}
//       </Select>
//     </FormControl>
//   );
// };

// NewsCategoriesDropdown.propTypes = {
//     onCategoryChange: PropTypes.func.isRequired,  // Ensure it's a function and it's required
//   };
  

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
        console.log(response.data); // Debug: Check the actual data
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
    onCategoryChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        label="Category"
        onChange={handleCategoryChange}
        defaultValue=""
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '500px',
            },
          },
        }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : (
          categories
            .filter(category => category?.display_name)
            .map((category) => (
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
  onCategoryChange: PropTypes.func.isRequired,
};

export default NewsCategoriesDropdown;