// // src/components/feed-type-dropdown.jsx
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
// import request from 'src/api/request';

// const FeedTypeDropdown = ({ onFeedTypeChange }) => {
//   const [feedTypes, setFeedTypes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeedTypes = async () => {
//       try {
//         const response = await request.get('backoffice/edutain/feeds'); // API for feed types
//         setFeedTypes(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching feed types:', err);
//         setLoading(false);
//       }
//     };

//     fetchFeedTypes();
//   }, []);

//   const handleFeedTypeChange = (event) => {
//     onFeedTypeChange(event.target.value); // Pass the selected feed type to parent component
//   };

//   return (
//     <FormControl fullWidth>
//       <InputLabel>Feed Type</InputLabel>
//       <Select
//         label="Feed Type"
//         onChange={handleFeedTypeChange}
//         defaultValue=""
//       >
//         {loading ? (
//           <MenuItem disabled>
//             <CircularProgress size={24} />
//           </MenuItem>
//         ) : (
//           feedTypes.map((feedType) => (
//             <MenuItem key={feedType.id} value={feedType.id}>
//               {feedType.feed_type} {/* Display feed type name */}
//             </MenuItem>
//           ))
//         )}
//       </Select>
//     </FormControl>
//   );
// };

// FeedTypeDropdown.propTypes = {
//   onFeedTypeChange: PropTypes.func.isRequired, // Validate prop type
// };

// export default FeedTypeDropdown;
