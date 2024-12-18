



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

// export default function EdutainmentListView() {
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ offset: 1, limit: 10 });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['edutainment', ],
//     queryFn: () => {
      
//       return request.get('https://dev-api.familifirst.com/edutain/feeds/');
//     },
    
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


import React, { useState , useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
 
  Card,
  Table,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Scrollbar from 'src/components/scrollbar';
import request from 'src/api/request';
import { TableNoData, TableHeadCustom } from 'src/components/table';



const TABLE_HEAD = [
  { id: 'language', label: 'Language' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'interaction', label: 'Interaction' },
  { id: 'created_date', label: 'Created Date' },
  { id: 'approved_date', label: 'Approved Date' },

  {id: 'image' , label: 'Image'},
  { id: 'post_date', label: 'Post Date' },
  // { id: 'actions', label: 'Actions' },
];

export default function EdutainmentListView() {
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ offset: 1, limit: 10 });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['edutainment'],
    queryFn: () => request.get('https://dev-api.familifirst.com/edutain/feeds/'),

  });

  useEffect(() => {
    if (data) {
      console.log('API Response:', data); // Log the entire API response
      if (data?.data?.length > 0) {
        setTableData(data.data); // Corrected to access 'data.data' array
        setTotalCount(data.total);
      } else {
        setTableData([]);
        setTotalCount(0);
      }
    }
  }, [data]);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, offset: newPage + 1 })); // Page offset adjustment
  };

  // Handle rows per page change
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
                  ? // Show loading skeleton
                    [...Array(10)].map((_, index) => (
                      <tr key={index}>
                        <td>Loading...</td>
                      </tr>
                    ))
                  : tableData.map((row) => (
                      <tr key={row.id}>
                        <td>{row.language}</td>
                        <td>{row.heading}</td>
                        <td>{row.description}</td>
                        <td>{row.likes_count}</td>
                        <td>{row.created_at}</td>
                        <td>{row.approved_time}</td>
                        <td>{row.image}</td>
                        <td>{row.posting_date}</td>
                        {/* <td>Actions</td> */}
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
          page={pagination.offset - 1} // Adjusting for zero-based page index
          rowsPerPage={pagination.limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}
































































// import React, { useState, useEffect } from 'react';
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
// import { useQuery } from '@tanstack/react-query';
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
//   const [pagination, setPagination] = useState({ offset: 1, limit: 10 });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['edutainment', id], // Removed pagination from query key
//     queryFn: () => {
//       return fetchData(id); // Fetch data without offset and limit
//     },
//   });

//   // Fetch function without offset and limit
//   const fetchData = async (id) => {
//     try {
//       const url = new URL(`https://dev-api.familifirst.com/edutain/feeds/${id || ''}`); // Include id in the URL

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return null;
//     }
//   };

//   // Handle response and update state
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

//   // Handle page change (pagination remains, but no longer affects the API request)
//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, offset: newPage + 1 }));
//   };

//   // Handle rows per page change (pagination remains, but no longer affects the API request)
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
//           page={pagination.offset - 1} // Adjusting for zero-based page index
//           rowsPerPage={pagination.limit}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Card>
//     </Container>
//   );
// }

// EdutainmentListView.propTypes = {
//   id: PropTypes.string, // Ensure `id` is passed as a prop
// };
