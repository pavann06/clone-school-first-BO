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
//     queryKey: ['edutainment',  pagination.page, pagination.page_size], 
//     queryFn: () =>
//       request.get('https://dev-api.familifirst.com/edutain/feeds/', {
//         params: {
//           page: pagination.page,
//           page_size: pagination.page_size,
//         },
//       }),
//     keepPreviousData: true, 
//   });

//   useEffect(() => {
//     if (data) {
//       console.log('API Response:', data); 
//       if (data?.data?.length > 0) {
//         setTableData(data.data); 
//         setTotalCount(data.total);
//       } else {
//         setTableData([]);
//         setTotalCount(0);
//       }
//     }
//   }, [data]);

//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage + 1 })); 
//   };

//   const handleRowsPerPageChange = (event) => {
//     setPagination({ page: 1, page_size: parseInt(event.target.value, 10) });
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
//                   ? [...Array(pagination.limit)].map((_, index) => (
//                       <TableRow key={index}>
//                         {TABLE_HEAD.map((head) => (
//                           <TableCell key={head.id} align="center">
//                             <Skeleton variant="text" width={80} height={30} />
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   : tableData.map((row, index) => {
//                       const handleMouseEnter = (e) => {
//                         e.target.style.backgroundColor = '#f1f1f1';
//                       };

//                       const handleMouseLeave = (e) => {
//                         e.target.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
//                       };

//                       return (
//                         <TableRow
//                           key={row.id}
//                           style={{
//                             backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
//                             cursor: 'pointer',
//                           }}
//                           onMouseEnter={handleMouseEnter}
//                           onMouseLeave={handleMouseLeave}
//                         >
//                           <TableCell align="center">{row.language}</TableCell>
//                           <TableCell align="center">{row.heading}</TableCell>
//                           <TableCell align="center">{row.description}</TableCell>
//                           <TableCell align="center">{row.likes_count}</TableCell>
//                           <TableCell align="center">{new Date(row.created_at).toLocaleDateString('en-GB')}</TableCell>
//                           <TableCell align="center">{new Date(row.approved_time).toLocaleDateString('en-GB')}</TableCell>
//                           <TableCell align="center">
//                             {row.image ? (
//                               <img
//                                 src={row.image}
//                                 alt={`Thumbnail for ${row.heading}`}
//                                 style={{ maxWidth: 100, maxHeight: 50 }}
//                               />
//                             ) : (
//                               'No Image'
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                 {!isLoading && tableData.length === 0 && <TableNoData />}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           count={totalCount}
//           page={pagination.page - 1} // Adjusted for zero-based indexing
//           rowsPerPage={pagination.page_size}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Card>
//     </Container>
//   );
// }

// imp end---------------------








// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Card, Table, Container, TableBody, TableContainer, TablePagination, Skeleton, TableRow, TableCell } from '@mui/material';

// import Scrollbar from 'src/components/scrollbar';
// import request from 'src/api/request';
// import { TableNoData, TableHeadCustom } from 'src/components/table';
// import { label } from 'yet-another-react-lightbox';

// const TABLE_HEAD = [
//   { id: 'prompt', label: 'Prompt' },
//   { id: 'benefit', label: 'Benefit' },
//   { id: 'description', label: 'Description' },
//   { id: 'youtube_video_url' , label: 'Youtube'},
//   // { id: 'interaction', label: 'Interaction' },
//   { id: 'date', label: 'Date' },
//   // { id: 'approved_date', label: 'Approved Date' },
//   { id: 'image', label: 'Image' },
// ];

// export default function CalenderListView() {
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['edutainment', pagination.page, pagination.page_size],
//     queryFn: async () =>
//       request.get('https://dev-api.familifirst.com/broadcast/calendars/', {
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
//                         <TableCell align="center">{row.prompt}</TableCell>
//                         <TableCell align="center">{row.benefit}</TableCell>
//                         <TableCell align="center">{row.description}</TableCell>
//                         <TableCell align="center">{row.youtube_video_url}</TableCell>
//                         <TableCell align="center">
//                           {row.created_at
//                             ? new Date(row.date).toLocaleDateString('en-GB')
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














import React, { useState, useEffect ,useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Table, Container, TableBody, TableContainer, TablePagination, Skeleton } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';
import request from 'src/api/request';
import { TableNoData, TableHeadCustom } from 'src/components/table';

 import { useRouter } from 'src/routes/hooks';
 import { paths } from 'src/routes/paths';
 import CalenderTableRow from '../calender-table-row';
// import { RouterLink } from 'src/routes/components';

const TABLE_HEAD = [
  { id: 'prompt', label: 'Prompt' },
  { id: 'benefit', label: 'Benefit' },
  { id: 'description', label: 'Description' },
  { id: 'youtube_video_url', label: 'Youtube' },
  { id: 'date', label: 'Date' },
  { id: 'image', label: 'Image' },
];

export default function CalenderListView() {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['calendar', pagination.page, pagination.page_size],
    queryFn: async () => {
      const { page, page_size } = pagination;
      const response = await request.get(
        `https://dev-api.familifirst.com/broadcast/calendar?page=${page}&page_size=${page_size}`
      );
      return response;
    },
    keepPreviousData: true,
  });
  
  

  useEffect(() => {
    if (data) {
      if (data?.data?.length > 0) {
        setTableData(data.data);
        setTotalCount(data.total);
      } else {
        setTableData([]);
        setTotalCount(0);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setTableData([]);
    }
  }, [isLoading]);

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    setPagination({ page: 1, page_size: parseInt(event.target.value, 10) });
  };
  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.calender.edit(id));
    },
    [router]
  );

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

   

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
                      <CalenderTableRow key={index} isLoading />
                    ))
                  : tableData.map((row) => (
                      <CalenderTableRow
                        key={row.id}
                        row={row}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                {!isLoading && tableData.length === 0 && <TableNoData />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={pagination.page - 1}
          rowsPerPage={pagination.page_size}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}
