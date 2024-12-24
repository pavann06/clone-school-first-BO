// imp-----------------------------

<<<<<<< HEAD
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












import React, { useState, useEffect } from 'react';
=======
>>>>>>> development
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  Skeleton,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import request from 'src/api/request';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';

import EdutainmentTableRow from '../edutainment-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'approved_date', label: 'Approved ' },
  { id: 'image', label: 'Image' },
  { id: 'likes_count', label: 'Likes ' },
  { id: 'language', label: 'language' },
  { id: 'actions ', label: 'Actions' },
];

export default function EdutainmentListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

<<<<<<< HEAD
  // Using query to fetch data from API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pagination.page,
        page_size: pagination.page_size,
      });
      const url = `https://dev-api.familifirst.com/edutain/feeds/?${params.toString()}`;
      console.log("Request URL:", url); // Log the URL to inspect
      return request.get(url); // Make the GET request
    },
=======
  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `backoffice/edutain/feeds?page=${pagination.page}&page_size=${pagination.page_size}`
      ),
>>>>>>> development
    keepPreviousData: true,
  });

  // Set data when fetched successfully
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

<<<<<<< HEAD
  // Clear table data when loading
  useEffect(() => {
    if (isLoading) {
      setTableData([]);
    }
  }, [isLoading]);

  // Handle pagination page change
=======
>>>>>>> development
  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  // Handle change in number of rows per page
  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPagination({ page: 1, page_size: newPageSize });
  };

<<<<<<< HEAD
  // Error handling for the query
  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }
=======
  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.edutainment.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/edutain/feeds/${id}`);

    const { success } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar('Deleted successfully');

      // refetch the data
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };
>>>>>>> development

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Edutainment',
              href: paths.dashboard.edutainment.root,
            },
            { name: 'List' },
          ]}
        />
      </Box>
      <Card>
        <TableContainer>
          <Scrollbar>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading
                  ? [...Array(pagination.page_size)].map((_, index) => (
                      <Skeleton key={index} variant="rectangular" height={40} />
                    ))
                  : tableData.map((row, index) => (
                      <EdutainmentTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no: (pagination.page - 1) * pagination.page_size + index + 1, // Updated serial number calculation
                        }}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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
