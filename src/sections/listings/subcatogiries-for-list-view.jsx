



// import React, { useEffect, useState, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import request from 'src/api/request';

// const BusinessSubcategoriesDropdown = forwardRef(({ value, onChange, categoryId, categoryName }, ref) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (categoryId && categoryName) {
//       setLoading(true);
 
//     const fetchSubcategories = async () => {
//         try {
//           const response = await request.get(`backoffice/business/categories?parent_id=${categoryId}`);
//           if (response?.success && Array.isArray(response.data)) {
//             setSubcategories(response.data);
//           } else {
//             enqueueSnackbar('Failed to load sub categories', { variant: 'error' });
//           }
//         } catch (error) {
//           enqueueSnackbar('Error fetching sub categories', { variant: 'error' });
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchSubcategories();
//     } else {
//       setSubcategories([]);
//     }
//   }, [categoryId, categoryName, enqueueSnackbar]);

//   const renderMenuContent = () => {
//     if (loading) return <MenuItem disabled>Loading...</MenuItem>;
//     if (subcategories.length > 0) {
//       return subcategories.map((subcategory) => (
//         <MenuItem key={subcategory.id} value={subcategory.id}>
//           {subcategory.category_name}
//         </MenuItem>
//       ));
//     }
//     return <MenuItem disabled>No subcategories available</MenuItem>;
//   };

//   return (
//     <Select
//       ref={ref}
//       multiple
//       value={value}
//       onChange={(event) => onChange(event.target.value)}
//       fullWidth
//       renderValue={(selected) =>
//         subcategories
//           .filter((sub) => selected.includes(sub.id))
//           .map((sub) => sub.category_name)
//           .join(', ')
//       }
//     >
//       {renderMenuContent()}
//     </Select>
//   );
// });

// BusinessSubcategoriesDropdown.propTypes = {
//   value: PropTypes.array.isRequired, // Selected subcategory IDs
//   onChange: PropTypes.func.isRequired, // Callback for value change
//   categoryId: PropTypes.string.isRequired, // Selected category ID
//   categoryName: PropTypes.string.isRequired, // Selected category name
// };

// export default BusinessSubcategoriesDropdown;




import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import request from 'src/api/request';

const SubcategoriesDropdown = forwardRef(({ value, onChange, categoryId, categoryName }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId && categoryName) {
      setLoading(true);

      const fetchSubcategories = async () => {
        try {
          const response = await request.get(`backoffice/business/categories?parent_id=${categoryId}`);
          if (response?.success && Array.isArray(response.data)) {
            setSubcategories(response.data);
          } else {
            enqueueSnackbar('Failed to load subcategories', { variant: 'error' });
          }
        } catch (error) {
          enqueueSnackbar('Error fetching subcategories', { variant: 'error' });
        } finally {
          setLoading(false);
        }
      };

      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [categoryId, categoryName, enqueueSnackbar]);

  const renderMenuContent = () => {
    if (loading) return <MenuItem disabled>Loading...</MenuItem>;
    if (subcategories.length > 0) {
      return subcategories.map((subcategory) => (
        <MenuItem key={subcategory.id} value={subcategory.id}>
          {subcategory.category_name}
        </MenuItem>
      ));
    }
    return <MenuItem disabled>No subcategories available</MenuItem>;
  };

  return (
    <Select
      ref={ref}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      // Single select (no "multiple" prop)
    >
      {renderMenuContent()}
    </Select>
  );
});

SubcategoriesDropdown.propTypes = {
  value: PropTypes.string.isRequired, // Single selected subcategory ID
  onChange: PropTypes.func.isRequired, // Callback for value change
  categoryId: PropTypes.string.isRequired, // Selected category ID
  categoryName: PropTypes.string.isRequired, // Selected category name
};

export default SubcategoriesDropdown;
