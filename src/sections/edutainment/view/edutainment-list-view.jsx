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


// imp-----------------------------


import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  Table, 
  Container, 
  TableBody, 
  TableContainer, 
  TablePagination, 
  Skeleton, 
  TableRow, 
  TableCell 
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
  { id: 'image', label: 'Image' },
];

export default function EdutainmentListView() {
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `https://dev-api.familifirst.com/edutain/feeds?page=${pagination.page}&page_size=${pagination.page_size}`
      ),
    
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log('Pagination State:', pagination); // Debugging
    if (data) {
      console.log('API Response:', data); // Debugging
      if (data?.data?.length > 0) {
        setTableData(data.data);
        setTotalCount(data.total);
      } else {
        setTableData([]);
        setTotalCount(0);
      }
    }
  }, [data, pagination]);

  const handlePageChange = (event, newPage) => {
    console.log('Page Change:', newPage); // Debugging
    setPagination((prev) => ({ ...prev, page: newPage + 1 })); // Convert zero-based index to one-based index
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    console.log('Rows Per Page Change:', newPageSize); // Debugging
    setPagination({ page: 1, page_size: newPageSize });
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
                  ? [...Array(pagination.page_size)].map((_, index) => (
                      <TableRow key={index}>
                        {TABLE_HEAD.map((head) => (
                          <TableCell key={head.id} align="center">
                            <Skeleton variant="text" width={80} height={30} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : tableData.map((row, index) => (
                      <TableRow
                        key={row.id}
                        style={{
                          backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                          cursor: 'pointer',
                        }}
                      >
                        <TableCell align="center">{row.language}</TableCell>
                        <TableCell align="center">{row.heading}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.likes_count}</TableCell>
                        <TableCell align="center">{new Date(row.created_at).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell align="center">{new Date(row.approved_time).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell align="center">
                          {row.image ? (
                            <img
                              src={row.image}
                              alt={`Thumbnail for ${row.heading}`}
                              style={{ maxWidth: 100, maxHeight: 50 }}
                            />
                          ) : (
                            'No Image'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                {!isLoading && tableData.length === 0 && <TableNoData />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={pagination.page - 1} // Adjusted for zero-based indexing
          rowsPerPage={pagination.page_size}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}






























// imp end---------------------


// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Card, Table, Container, TableBody, TableContainer, TablePagination, Skeleton, TableRow, TableCell } from '@mui/material';

// import Scrollbar from 'src/components/scrollbar';
// import request from 'src/api/request';
// import { TableNoData, TableHeadCustom } from 'src/components/table';

// const TABLE_HEAD = [
//   { id: 'language', label: 'Language' },
//   { id: 'heading', label: 'Heading' },
//   { id: 'description', label: 'Description' },
//   { id: 'interaction', label: 'Interaction' },
//   { id: 'created_date', label: 'Created Date' },
//   { id: 'approved_date', label: 'Approved Date' },
//   { id: 'image', label: 'Image' },
// ];

// export default function EdutainmentListView() {
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['edutainment', pagination.page, pagination.page_size],
//     queryFn: async () =>
//       request.get('https://dev-api.familifirst.com/edutain/feeds/', {
//         params: { page: pagination.page, page_size: pagination.page_size }, // Ensure params are passed correctly
//       }),
//     keepPreviousData: true,
//   });

//   useEffect(() => {
//     if (data) {
//       if (data?.data?.length > 0) {
//         setTableData(data.data);
//         setTotalCount(data.total);
//       } else {
//         setTableData([]);
//         setTotalCount(0);
//       }
//     }
//   }, [data]);

//   useEffect(() => {
//     if (isLoading) {
//       setTableData([]);
//     }
//   }, [isLoading]);

//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage + 1 })); // Adjust for zero-based index
//   };

//   const handleRowsPerPageChange = (event) => {
//     setPagination({ page: 1, page_size: parseInt(event.target.value, 10) });
//   };

//   if (isError) {
//     return <div>Error loading data. Please try again later.</div>;
//   }

//   return (
//     <Container maxWidth="lg">
//       <Card>
//         <TableContainer>
//           <Scrollbar>
//             <Table>
//               <TableHeadCustom headLabel={TABLE_HEAD} />
//               <TableBody>
//                 {isLoading
//                   ? [...Array(pagination.page_size)].map((_, index) => (
//                       <TableRow key={index}>
//                         {TABLE_HEAD.map((head) => (
//                           <TableCell key={head.id} align="center">
//                             <Skeleton variant="text" width={80} height={30} />
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   : tableData.map((row, index) => (
//                       <TableRow
//                         key={row.id}
//                         hover
//                         style={{
//                           backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         <TableCell align="center">{row.language}</TableCell>
//                         <TableCell align="center">{row.heading}</TableCell>
//                         <TableCell align="center">{row.description}</TableCell>
//                         <TableCell align="center">{row.likes_count}</TableCell>
//                         <TableCell align="center">
//                           {row.created_at
//                             ? new Date(row.created_at).toLocaleDateString('en-GB')
//                             : 'N/A'}
//                         </TableCell>
//                         <TableCell align="center">
//                           {row.approved_time
//                             ? new Date(row.approved_time).toLocaleDateString('en-GB')
//                             : 'N/A'}
//                         </TableCell>
//                         <TableCell align="center">
//                           {row.image ? (
//                             <img
//                               src={row.image}
//                               alt={`Thumbnail for ${row.heading}`}
//                               style={{ maxWidth: 100, maxHeight: 50 }}
//                             />
//                           ) : (
//                             'No Image'
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 {!isLoading && tableData.length === 0 && <TableNoData />}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           count={totalCount}
//           page={pagination.page - 1} // Adjust for zero-based indexing
//           rowsPerPage={pagination.page_size}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Card>
//     </Container>
//   );
// }

















// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   Container,
//   Table,
//   TableBody,
//   TableContainer,
//   TablePagination,{/* <td>{row.created_at}</td> {/* <td>Actions</td> <td>{row.approved_time}</td> */}  
 
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



            // <TableBody>
            //     {isLoading
            //       ? 
            //         [...Array(10)].map((_, index) => (
            //           <tr key={index}>
            //             <td>Loading...</td>
            //           </tr>
            //         ))
            //       : tableData.map((row) => (
            //           <tr key={row.id}>
            //             <td>{row.language}</td>
            //             <td>{row.heading}</td>
            //             <td>{row.description}</td>
            //             <td>{row.likes_count}</td>
                        
            //             <td>{new Date(row.created_at).toLocaleDateString('en-GB')}</td>
            //             <td>{new Date(row.approved_time).toLocaleDateString('en-GB')}</td>

            //             <td>{row.image}</td>
            //             <td>{row.posting_date}</td>
                      
            //           </tr>
            //         ))}
            //     {!isLoading && tableData.length === 0 && <TableNoData />}
            //   </TableBody> */}