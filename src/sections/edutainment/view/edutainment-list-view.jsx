

// import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback } from 'react';

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

import EdutainmentTableRow from '../edutainment-table-row';


const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'approved_date', label: 'Approved ' },
  { id: 'image', label: 'Image' },
  { id: 'likes_count', label: 'Likes ' },
  { id: 'language', label: 'Language' },
  {id: 'status' , label : 'Status'},
  { id: 'actions ', label: 'Actions' },
];

export default function EdutainmentListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `backoffice/edutain/feeds?page=${pagination.page}&page_size=${pagination.page_size}`
      ),
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
              <Button
          component={RouterLink}
          href={paths.dashboard.edutainment.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Feed
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



// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { paths } from 'src/routes/paths';
// import {
//   Box,
//   Card,
//   Table,
//   Skeleton,
//   Button,
//   Container,
//   TableBody,
//   TableContainer,
//   TablePagination,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';
// import Iconify from 'src/components/iconify';
// import request from 'src/api/request';
// import Scrollbar from 'src/components/scrollbar';
// import { useSnackbar } from 'src/components/snackbar';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { TableNoData, TableHeadCustom } from 'src/components/table';
// import EdutainmentTableRow from '../edutainment-table-row';

// const TABLE_HEAD = [
//   { id: 'index', label: 'Serial No' },
//   { id: 'heading', label: 'Heading' },
//   { id: 'description', label: 'Description' },
//   { id: 'approved_date', label: 'Approved' },
//   { id: 'image', label: 'Image' },
//   { id: 'likes_count', label: 'Likes' },
//   { id: 'language', label: 'Language' },
//   { id: 'status', label: 'Status' },
//   { id: 'actions', label: 'Actions' },
// ];

// export default function EdutainmentListView() {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const [tableData, setTableData] = useState([]);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });
//   const [selectedTab, setSelectedTab] = useState(0);

//   const { data, isLoading } = useQuery({
//     queryKey: ['edutainment'],
//     queryFn: () => request.get('backoffice/edutain/feeds'),
//     keepPreviousData: true,
//   });

//   useEffect(() => {
//     if (data?.data?.length > 0) {
//       setTableData(data.data);
//     } else {
//       setTableData([]);
//     }
//   }, [data]);

//   const feedType = useMemo(
//     () => ['Text', 'Image', 'Video', 'Youtube video'][selectedTab] || '',
//     [selectedTab]
//   );

//   const filteredData = useMemo(
//     () => tableData.filter((post) => post.feed_type === feedType),
//     [tableData, feedType]
//   );
  

//   const paginatedData = useMemo(() => {
//     const start = (pagination.page - 1) * pagination.page_size;
//     const end = start + pagination.page_size;
//     return filteredData.slice(start, end);
//   }, [filteredData, pagination]);

//   useEffect(() => {
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   }, [selectedTab]);

//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage + 1 }));
//   };

//   const handleRowsPerPageChange = (event) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     setPagination({ page: 1, page_size: newPageSize });
//   };

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.edutainment.edit(id));
//     },
//     [router]
//   );

//   const handleDeleteRow = async (id) => {
//     const response = await request.delete(`backoffice/edutain/feeds/${id}`);
//     const { success } = response;

//     if (success) {
//       enqueueSnackbar('Deleted successfully');
//       // Refetch or remove from local data
//       setTableData((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
//         <CustomBreadcrumbs
//           heading="List"
//           links={[
//             { name: 'Dashboard', href: paths.dashboard.root },
//             { name: 'Edutainment', href: paths.dashboard.edutainment.root },
//             { name: 'List' },
//           ]}
//         />
//         <Button
//           component={RouterLink}
//           href={paths.dashboard.edutainment.new}
//           variant="contained"
//           startIcon={<Iconify icon="mingcute:add-line" />}
//           sx={{
//             position: 'absolute',
//             bottom: '5px',
//             right: '5px',
//           }}
//         >
//           New Feed
//         </Button>
//       </Box>

//       <Tabs
//         value={selectedTab}
//         onChange={(event, newValue) => setSelectedTab(newValue)}
//         aria-label="feed-type-tabs"
//       >
//         <Tab label="Text" />
//         <Tab label="Image" />
//         <Tab label="Video" />
//         <Tab label="YouTube video" />
//       </Tabs>

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
//                   : paginatedData.map((row, index) => (
//                       <EdutainmentTableRow
//                         key={row.id}
//                         row={{
//                           ...row,
//                           serial_no:
//                             (pagination.page - 1) * pagination.page_size + index + 1,
//                         }}
//                         onEditRow={() => handleEditRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                       />
//                     ))}
//                 {!isLoading && paginatedData.length === 0 && <TableNoData />}
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={pagination.page - 1}
//           rowsPerPage={pagination.page_size}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Card>
//     </Container>
//   );
// }
