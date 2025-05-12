

// // import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import React, { useState, useEffect, useCallback } from 'react';

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
// } from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';
// import Iconify from 'src/components/iconify';

// import request from 'src/api/request';

// import Scrollbar from 'src/components/scrollbar';
// import { useSnackbar } from 'src/components/snackbar';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { TableNoData, TableHeadCustom } from 'src/components/table';

// import CompetitionTableRow from '../competition-table-row';



// const TABLE_HEAD = [
//   { id: 'index', label: 'Serial No' },
//   { id: 'contest_name', label: 'Name' },
//   { id: 'contest_description', label: 'Description' },
//   { id: 'total_words', label: 'Total Words ' },
//   { id: 'prize_pool', label: 'Prize Pool' },
//   { id: 'start_time' , label: 'Start Time'},

//   { id: 'actions ', label: 'Actions' },
// ];

// export default function CompetitionListView() {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

//   const { data, isLoading } = useQuery({
//     queryKey: ['edutainment', pagination.page, pagination.page_size],
//     queryFn: () =>
//       request.get(
//         `backoffice/contest?page=${pagination.page}&page_size=${pagination.page_size}`
//       ),
//     keepPreviousData: true,
//   });

//   // Set data when fetched successfully
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
//       router.push(paths.dashboard.competition.edit(id));
//     },
//     [router]
//   );
//    const handleViewRow = useCallback(
//       (id) => {
//         const targetPath = paths.dashboard.competition.view(id);
  
//         router.push(targetPath);
//       },
//       [router]
//     );

//   const handleDeleteRow = async (id) => {
//     const response = await request.delete(`backoffice/contest/${id}`);

//     const { success } = response;

//     // contact creation success
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
//             {
//               name: 'Competition',
//               href: paths.dashboard.competition.root,
//             },
//             { name: 'List' },
//           ]}
//         />
//               <Button
//           component={RouterLink}
//           href={paths.dashboard.competition.new}
//           variant="contained"
//           startIcon={<Iconify icon="mingcute:add-line" />}
//           sx={{
//             position: 'absolute',
//             bottom: '5px',
//             right: '5px',
//           }}
//         >
//           New Competition
//         </Button>
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
//                       <CompetitionTableRow
//                         key={row.id}
//                         row={{
//                           ...row,
//                           serial_no: (pagination.page - 1) * pagination.page_size + index + 1, // Updated serial number calculation
//                         }}
//                         onEditRow={() => handleEditRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                         onViewRow={() => handleViewRow(row.id)}
                        
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


import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Card,
  Table,
  Skeleton,
  Button,
  Container,
  Tabs,
  Tab,
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

import CompetitionTableRow from '../competition-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'contest_name', label: 'Name' },
  { id: 'contest_description', label: 'Description' },
  { id: 'total_words', label: 'Total Words ' },
  { id: 'prize_pool', label: 'Prize Pool' },
  { id: 'start_time', label: 'Start Time' },
  { id: 'actions', label: 'Actions' },
];

const STATUS_TABS = [
  { label: 'Upcoming', value: 'Pending' },
  { label: 'Ongoing', value: 'Ongoing' },
  { label: 'Completed', value: 'Completed' },
];


export default function CompetitionListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });
  const [status, setStatus] = useState('Pending'); // Default tab

  const handleChangeStatus = (event, newValue) => {
    setStatus(newValue);
    setPagination({ page: 1, page_size: pagination.page_size }); // Reset to page 1 on tab change
  };

  const { data, isLoading } = useQuery({
  queryKey: ['competitions', pagination.page, pagination.page_size, status],
  queryFn: () =>
    request.get(
      `backoffice/contest?page=${pagination.page}&page_size=${pagination.page_size}&contest_status=${status}`
    ),
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

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPagination({ page: 1, page_size: newPageSize });
  };

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.competition.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      const targetPath = paths.dashboard.competition.view(id);
      router.push(targetPath);
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/contest/${id}`);
    const { success } = response;

    if (success) {
      enqueueSnackbar('Deleted successfully');
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
              name: 'Competition',
              href: paths.dashboard.competition.root,
            },
            { name: 'List' },
          ]}
        />

        <Button
          component={RouterLink}
          href={paths.dashboard.competition.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Competition
        </Button>
      </Box>

      {/* Tabs */}
     <Tabs
  value={status}
  onChange={handleChangeStatus}
  sx={{ mb: 2 }}
  textColor="primary"
  indicatorColor="primary"
>
  {STATUS_TABS.map((tab) => (
    <Tab key={tab.value} label={tab.label} value={tab.value} />
  ))}
</Tabs>


      {/* Table */}
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
                      <CompetitionTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no:
                            (pagination.page - 1) * pagination.page_size +
                            index +
                            1,
                        }}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
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
