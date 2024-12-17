



// import React, { useState, useEffect } from 'react';


// import {
//   Box,
//   Card,
//   Container,
//   Table,
//   TableBody,
//   TableContainer,
//   TablePagination,
// } from '@mui/material';

// import { useQuery } from '@tanstack/react-query';
// import Scrollbar from 'src/components/scrollbar';
// import { TableNoData, TableHeadCustom } from 'src/components/table';
// import request from 'src/api/request';
// import PropTypes from 'prop-types';


// const TABLE_HEAD = [
//   { id: 'language', label: 'Language' },
//   { id: 'heading', label: 'Heading' },
//   { id: 'description', label: 'Description' },
//   { id: 'interaction', label: 'Interaction' },
//   { id: 'created_date', label: 'Created Date' },
//   { id: 'approved_date', label: 'Approved Date' },
//   { id: 'post_date', label: 'Post Date' },
//   { id: 'actions', label: 'Actions' },
// ];

// export default function EdutainmentListView({ id }) {
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ offset: 1, limit: 10 });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['edutainment', id],
//     queryFn: () => {
//       if (!id) {
//         throw new Error('ID is required to fetch data');
//       }
//       return request.get(``);
//     },
//     enabled: !!id, // Only fetch data when ID is provided
//   });
  
  

//   useEffect(() => {
//     if (data) {
//       console.log('API Response:', data); // Log the entire API response
//       if (data?.info?.length > 0) {
//         setTableData(data.info);
//         setTotalCount(data.total);
//       } else {
//         setTableData([]);
//         setTotalCount(0);
//       }
//     }
//   }, [data]);

//   // Handle page change
//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, offset: newPage }));
//   };

//   // Handle rows per page change
//   const handleRowsPerPageChange = (event) => {
//     setPagination({ offset: 1, limit: parseInt(event.target.value, 10) });
//   };

//   return (
//     <Container maxWidth="lg">
//       <Card>
//         <TableContainer>
//           <Scrollbar>
//             <Table>
//               <TableHeadCustom headLabel={TABLE_HEAD} />
//               <TableBody>
//                 {isLoading
//                   ? // Show loading skeleton
//                     [...Array(10)].map((_, index) => (
//                       <tr key={index}>
//                         <td>Loading...</td>
//                       </tr>
//                     ))
//                   : tableData.map((row) => (
//                       <tr key={row.id}>
//                         {TABLE_HEAD.map((col) => (
//                           <td key={col.id}>{row[col.id]}</td>
//                         ))}
//                       </tr>
//                     ))}
//                 {!isLoading && tableData.length === 0 && (
//                   <TableNoData />
//                 )}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         {/* Pagination */}
//         <TablePagination
//           component="div"
//           count={totalCount}
//           page={pagination.offset}
//           rowsPerPage={pagination.limit}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Card>
//     </Container>
//   );
// }
// EdutainmentListView.propTypes = {
//   id: PropTypes.string.isRequired, // or PropTypes.number if it's a number
// };

















// import { useQuery } from '@tanstack/react-query';
// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   Container,
//   Table,
//   TableBody,
//   TableContainer,
//   TablePagination,
//   Typography,
// } from '@mui/material';

// import request from 'src/api/request'; // Assuming this is configured to handle API requests
// import Scrollbar from 'src/components/scrollbar';
// import { TableNoData, TableHeadCustom } from 'src/components/table';
// import PropTypes from 'prop-types';

// const TABLE_HEAD = [
//   { id: 'language', label: 'Language' },
//   { id: 'heading', label: 'Heading' },
//   { id: 'description', label: 'Description' },
//   { id: 'interaction', label: 'Interaction' },
//   { id: 'created_date', label: 'Created Date' },
//   { id: 'approved_date', label: 'Approved Date' },
//   { id: 'post_date', label: 'Post Date' },
//   { id: 'actions', label: 'Actions' },
// ];

// export default function EdutainmentListView({ id }) {
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ offset: 0, limit: 10 });

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['edutainment', id, pagination.offset, pagination.limit],
//     queryFn: () => {
//       if (!id) {
//         throw new Error('ID is required to fetch data');
//       }

//       // Retrieve the token (e.g., from localStorage)
//       const token = localStorage.getItem('authToken'); // Adjust this based on how you store the token

//       if (!token) {
//         throw new Error('Authentication token is required');
//       }

//       // Make the request to the API
//       return request.get(`https://dev-api.familifirst.com/edutain/feeds/`, {
//         params: {
//           offset: pagination.offset,
//           limit: pagination.limit,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//         },
//       });
//     },
//     enabled: !!id, // Only fetch data when ID is provided
//     onSuccess: (data) => {
//       console.log('API Response:', data); // Log the data once the API request is successful
//       if (data?.info) {
//         setTableData(data.info); // Update state with data
//         setTotalCount(data.total); // Update total count
//       } else {
//         setTableData([]);
//         setTotalCount(0);
//       }
//     },
//   });

//   useEffect(() => {
//     // Handle changes to the data when it updates
//     if (data?.info) {
//       console.log('Updated API Response:', data); // Log updated data
//     }
//   }, [data]);

//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, offset: newPage }));
//   };

//   const handleRowsPerPageChange = (event) => {
//     setPagination({ offset: 0, limit: parseInt(event.target.value, 10) });
//   };

//   return (
//     <Container maxWidth="lg">
//       <Card>
//         <TableContainer>
//           <Scrollbar>
//             <Table>
//               <TableHeadCustom headLabel={TABLE_HEAD} />
//               <TableBody>
//                 {isLoading
//                   ? // Show loading skeleton
//                     [...Array(10)].map((_, index) => (
//                       <tr key={index}>
//                         <td>Loading...</td>
//                       </tr>
//                     ))
//                   : tableData?.map((row) => (
//                       <tr key={row.id}>
//                         {TABLE_HEAD.map((col) => (
//                           <td key={col.id}>{row[col.id]}</td>
//                         ))}
//                       </tr>
//                     ))}
//                 {!isLoading && tableData.length === 0 && <TableNoData />}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         {/* Pagination */}
//         <TablePagination
//           component="div"
//           count={totalCount}
//           page={pagination.offset} // Adjusted page index to match the TablePagination's 0-based index
//           rowsPerPage={pagination.limit}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />

//         {/* Show Error Message if API Request Fails */}
//         {isError && (
//           <Box mt={2}>
//             <Typography variant="body1" color="error">
//               Error: {error.message || 'An error occurred while fetching data'}
//             </Typography>
//           </Box>
//         )}
//       </Card>
//     </Container>
//   );
// }

// EdutainmentListView.propTypes = {
//   id: PropTypes.string.isRequired, // or PropTypes.number if it's a number
// };















import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';

import request from 'src/api/request'; // Assuming this is configured to handle API requests
import Scrollbar from 'src/components/scrollbar';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import PropTypes from 'prop-types';

const TABLE_HEAD = [
  { id: 'language', label: 'Language' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'interaction', label: 'Interaction' },
  { id: 'created_date', label: 'Created Date' },
  { id: 'approved_date', label: 'Approved Date' },
  { id: 'post_date', label: 'Post Date' },
  { id: 'actions', label: 'Actions' },
];

export default function EdutainmentListView({ id }) {
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ offset: 1, limit: 10 });

  const { isLoading, isError, error } = useQuery({
    queryKey: ['edutainment', id, pagination.offset, pagination.limit],
    queryFn: async () => {
      if (!id) throw new Error('ID is required to fetch data');

      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is required');

      const response = await request.get('https://dev-api.familifirst.com/edutain/feeds/', {
        params: {
          offset: pagination.offset,
          limit: pagination.limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      return response.data;
    },
    enabled: !!id,
    onSuccess: (data) => {
      if (data?.info) {
        setTableData(data.info);
        setTotalCount(data.total || 0);
      } else {
        setTableData([]);
        setTotalCount(0);
      }
    },
    onError: (err) => {
      console.error('Error fetching data:', err);
    },
  });

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, offset: newPage }));
  };

  const handleRowsPerPageChange = (event) => {
    setPagination({ offset: 1, limit: parseInt(event.target.value, 10) });
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <TableContainer>
          <Scrollbar>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading
                  ? [...Array(10)].map((_, index) => (
                      <tr key={index}>
                        <td>Loading...</td>
                      </tr>
                    ))
                  : tableData.map((row) => (
                      <tr key={row.id}>
                        {TABLE_HEAD.map((col) => (
                          <td key={col.id}>{row[col.id]}</td>
                        ))}
                      </tr>
                    ))}
                {!isLoading && tableData.length === 0 && <TableNoData />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalCount}
          page={Math.floor(pagination.offset / pagination.limit)} // Adjusted for 0-based indexing
          rowsPerPage={pagination.limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        {/* Error Message */}
        {isError && (
          <Box mt={2}>
            <Typography variant="body1" color="error">
              Error: {error?.message || 'An error occurred while fetching data'}
            </Typography>
          </Box>
        )}
      </Card>
    </Container>
  );
}

EdutainmentListView.propTypes = {
  id: PropTypes.string.isRequired, // Ensure 'id' is always passed as a string
};
   