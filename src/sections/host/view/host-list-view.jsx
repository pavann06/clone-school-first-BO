

// import { useSnackbar } from 'notistack';
// // imp-----------------------------
// import React, { useState, useEffect, useCallback } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// import {
//   Box,
//   Card,
//   Table,
//   Skeleton,
//   Container,
//   Button,
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
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { TableNoData, TableHeadCustom } from 'src/components/table';

// import HostTableRow from '../host-table-row';

// const TABLE_HEAD = [
//   { id: 'serial_no', label: 'Serial No' }, // Added serial number column
//   { id: 'name', label: 'Name' },
//   { id: 'about_host', label: 'About Host' },
//   { id: 'qualification', label: 'Qualification' },
//   { id: 'experience', label: 'Experience' },
 
//   { id: 'actions', label: 'Actions' },
// ];

// export default function CalenderListView() {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const { enqueueSnackbar } = useSnackbar();
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

//   const { data, isLoading } = useQuery({
//     queryKey: ['calendar', pagination.page, pagination.page_size],
//     queryFn: () =>
//       request.get(
//         // `backoffice/broadcast/calendar?page=${pagination.page}&page_size=${pagination.page_size}`
//         `backoffice/host?page=${pagination.page}&page_size=${pagination.page_size}`
//       ),
//     keepPreviousData: true,
//   });

//   useEffect(() => {
//     if (data) {
//       if (data?.data?.length > 0) {
//         // Add serial numbers to the data
//         const updatedData = data.data.map((item, index) => ({
//           ...item,
//           serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
//         }));
//         setTableData(updatedData);
//         setTotalCount(data.total);
//       } else {
//         setTableData([]);
//         setTotalCount(0);
//       }
//     }
//   }, [data, pagination.page, pagination.page_size]);

//   const handlePageChange = (event, newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage + 1 }));
//   };

//   const handleRowsPerPageChange = (event) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     setPagination({ page: 1, page_size: newPageSize });
//   };

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.host.edit(id));
//       console.log(id.data, 'id of the row');
//     },
//     [router]
//   );


//   const handleDeleteRow = async (id) => {
//     const response = await request.delete(`backoffice/host/${id}`);

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
//               name: 'Host',
//               href: paths.dashboard.host.root,
//             },
//             { name: 'List' },
//           ]}
//         />
//                <Button
//           component={RouterLink}
//           href={paths.dashboard.host.new}
//           variant="contained"
//           startIcon={<Iconify icon="mingcute:add-line" />}
//           sx={{
//             position: 'absolute',
//             bottom: '5px',
//             right: '5px',
//           }}
//         >
//           New Host
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
//                   : tableData.map((row) => (
//                       <HostTableRow
//                         key={row.id}
//                         row={{ ...row, id: Number(row.id) }}
//                         serial_no={row.serial_no} // Pass serial number to the row
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

import HostTableRow from '../host-table-row';


const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'name', label: 'Name' },
  { id: 'about_host', label: 'about_host' },
  { id: 'qualification', label: 'Qalification ' },
  { id: 'experience', label: 'Experience' },
  
  { id: 'actions ', label: 'Actions' },
];

export default function HostListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `backoffice/host?page=${pagination.page}&page_size=${pagination.page_size}`
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
      router.push(paths.dashboard.host.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/host/${id}`);

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
              name: 'Host',
              href: paths.dashboard.host.root,
            },
            { name: 'List' },
          ]}
        />
              <Button
          component={RouterLink}
          href={paths.dashboard.host.new}
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
                      <HostTableRow
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
