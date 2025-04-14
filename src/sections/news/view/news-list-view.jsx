// import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Table,
  Skeleton,
  Button,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

import request from 'src/api/request';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';

import NewsTableRow from '../news-table-row';
import NewsCategoriesDropdown from '../news-categories-dropdown';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  

  { id: 'categories', label: 'Categories ' },

  { id: 'images', label: 'Images' },

  { id: 'status', label: 'Status' },
  { id: 'actions ', label: 'Actions' },
];

export default function NewsListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });



  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: async () => {
      try {
        const response = await request.get(
          `backoffice/news?page=${pagination.page}&page_size=${pagination.page_size}`
        );
        return response;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.error('Unauthorized! Redirecting to login...');
          navigate('/auth/login?returnTo=%2Fdashboard'); // Redirect user to login page
        }
        throw err;
      }
    },
    keepPreviousData: true,
    onError: (err) => {
      console.error('Query error:', err);
    },
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

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  // Handle change in number of rows per page
  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPagination({ page: 1, page_size: newPageSize });
  };

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.news.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/news/${id}`);

    const { success } = response;

    
    if (success) {
      enqueueSnackbar('Deleted successfully');

      // refetch the data
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'News',
              href: paths.dashboard.news.root,
            },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.news.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New News
        </Button>
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
                      <NewsTableRow
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


// import React, { useState, useEffect, useCallback } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { Box, Card, Table, Skeleton, Button, Container, TableBody, TableContainer, TablePagination } from '@mui/material';
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';
// import Iconify from 'src/components/iconify';
// import request from 'src/api/request';
// import Scrollbar from 'src/components/scrollbar';
// import { useSnackbar } from 'src/components/snackbar';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { TableNoData, TableHeadCustom } from 'src/components/table';
// import NewsTableRow from '../news-table-row';
// import NewsCategoriesDropdown from '../news-categories-dropdown';

// const TABLE_HEAD = [
//   { id: 'index', label: 'Serial No' },
//   { id: 'title', label: 'Title' },
//   { id: 'description', label: 'Description' },
//   { id: 'categories', label: 'Categories' },
//   { id: 'images', label: 'Images' },
//   { id: 'status', label: 'Status' },
//   { id: 'actions', label: 'Actions' },
// ];

// export default function NewsListView() {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });
//   const [selectedCategory, setSelectedCategory] = useState(null);  // For storing selected category

//   const navigate = useNavigate();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['newsList', pagination.page, pagination.page_size, selectedCategory],
//     queryFn: async () => {
//       try {
//         const response = await request.get(`backoffice/news?page=${pagination.page}&page_size=${pagination.page_size}`);
//         return response;
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           console.error('Unauthorized! Redirecting to login...');
//           navigate('/auth/login?returnTo=%2Fdashboard');
//         }
//         throw err;
//       }
//     },
//     keepPreviousData: true,
//     onError: (err) => {
//       console.error('Query error:', err);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       if (data?.data?.length > 0) {
//         // Filter data based on the selected category
//         const filteredData = data.data.filter((newsItem) =>
//           selectedCategory ? newsItem.categories.includes(selectedCategory) : true
//         );
//         setTableData(filteredData);
//         setTotalCount(filteredData.length); // Update total count based on filtered data
//       } else {
//         setTableData([]);
//         setTotalCount(0);
//       }
//     }
//   }, [data, selectedCategory]);

//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId);
//     setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page when category changes
//   };

//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage + 1 }));
//   };

//   // Handle change in number of rows per page
//   const handleRowsPerPageChange = (event) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     setPagination({ page: 1, page_size: newPageSize });
//   };

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.news.edit(id));
//     },
//     [router]
//   );

//   const handleDeleteRow = async (id) => {
//     const response = await request.delete(`backoffice/news/${id}`);

//     const { success } = response;

//     if (success) {
//       enqueueSnackbar('Deleted successfully');

//       // refetch the data
//       setPagination((prev) => ({ ...prev, page: 1 }));
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
//         <CustomBreadcrumbs
//           heading="List"
//           links={[
//             { name: 'Dashboard', href: paths.dashboard.root },
//             { name: 'News', href: paths.dashboard.news.root },
//             { name: 'List' },
//           ]}
//         />
//         <Button
//           component={RouterLink}
//           href={paths.dashboard.news.new}
//           variant="contained"
//           startIcon={<Iconify icon="mingcute:add-line" />}
//           sx={{
//             position: 'absolute',
//             bottom: '5px',
//             right: '5px',
//           }}
//         >
//           New News
//         </Button>
//       </Box>

//       <Box sx={{ mb: 3, width: '25%'   }}>
//         <NewsCategoriesDropdown onCategoryChange={handleCategoryChange} />
//       </Box>

//       <Card>
//         <TableContainer>
//           <Scrollbar>
//             <Table>
//               <TableHeadCustom headLabel={TABLE_HEAD} />
//               <TableBody>
//                 {isLoading
//                   ? [...Array(pagination.page_size)].map((_, index) => (
//                       <Skeleton key={index} variant="rectangular" height={40} />
//                     ))
//                   : tableData.map((row, index) => (
//                       <NewsTableRow
//                         key={row.id}
//                         row={{
//                           ...row,
//                           serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
//                         }}
//                         onEditRow={() => handleEditRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                       />
//                     ))}
//                 {!isLoading && tableData.length === 0 && <TableNoData />}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           count={totalCount}
//           page={pagination.page - 1}
//           rowsPerPage={pagination.page_size}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Card>
//     </Container>
//   );
// }
