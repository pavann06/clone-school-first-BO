// import { useState, useEffect, useCallback } from 'react';
// import { useQuery , useQueryClient } from '@tanstack/react-query';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import { TablePagination } from '@mui/material';
// import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';

// import request from 'src/api/request';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';
// import { useSnackbar } from 'src/components/snackbar';
// import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import {
//   useTable,
//   emptyRows,
//   TableNoData,
//   TableSkeleton,
//   TableEmptyRows,
//   TableHeadCustom,
// } from 'src/components/table';

// import GradesTableRow from '../grades-table-row';
// import GradesTableToolbar from '../grades-table-toolbar';


// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'No', label: 'No',  },
//   { id: 'name', label: 'Name', },
//   { id: 'sections' , label: 'Sections'},

//   { label: 'Actions', },
// ];

// // ----------------------------------------------------------------------

// export default function GradesListView() {

//   const queryClient = useQueryClient();

//   const { enqueueSnackbar } = useSnackbar();

//   const router = useRouter();

//   const table = useTable();

//   const settings = useSettingsContext();

//   const [tableData, setTableData] = useState([]);

//   const [bannersCount, setBannersCount] = useState(0);
//   const [filters, setFilters] = useState({
//     page: 1,
//     pase: 10,
   

//   });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['banners', filters],
//     queryFn: () => request.get('/backoffice/grade', filters),
//     staleTime: 24 * 60 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (data?.info?.length > 0) {
//       setTableData(data.info);
//       setBannersCount(data.total);
//     } else {
//       setTableData([]);
//       setBannersCount(0);
//     }
//   }, [data]);

//   const handlePageChange = (event, newPage) => {
//     setFilters({
//       ...filters,
//       offset: newPage,
//     });
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setFilters({
//       ...filters,
//       limit: parseInt(event.target.value, 10),
//       offset: 0,
//     });
//   };

//   const denseHeight = table.dense ? 60 : 80;

//   const notFound = isError;

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.grades.edit(id));
//     },
//     [router]
//   );

//   const handleDeleteRow = async (id) => {

//     const response = await request.delete('banners', {"id": id});

//     const { success } = response;

//     // contact creation success
//     if (success) {
//       enqueueSnackbar('Deleted successfully');

//       // invalidate cache
//       queryClient.invalidateQueries(['banners']);

//       router.push(paths.dashboard.grades.root);
//     }
//   };

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
//         <CustomBreadcrumbs
//           heading="List"
//           links={[
//             { name: 'Dashboard', href: paths.dashboard.root },
//             {
//               name: 'Gardes',
//               href: paths.dashboard.grades.root,
//             },
//             { name: 'List' },
//           ]}
//         />
//         <Button
//           component={RouterLink}
//           href={paths.dashboard.grades.new}
//           variant="contained"
//           startIcon={<Iconify icon="mingcute:add-line" />}
//           sx={{
//             position: 'absolute',
//             bottom: '5px',
//             right: '5px',
//           }}
//         >
//           New Grade
//         </Button>
//       </Box>

//       <Card>
//         <GradesTableToolbar filters={filters} setFilters={setFilters} />

//         <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
//           <Scrollbar>
//             <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
//               <TableHeadCustom
//                 order={table.order}
//                 orderBy={table.orderBy}
//                 headLabel={TABLE_HEAD}
//                 rowCount={tableData.length}
//                 numSelected={table.selected.length}
//                 onSort={table.onSort}
//                 onSelectAllRows={(checked) =>
//                   table.onSelectAllRows(
//                     checked,
//                     tableData.map((row) => row.id)
//                   )
//                 }
//               />

//               <TableBody>
//                 {isLoading ? (
//                   [...Array(table.rowsPerPage)].map((i, index) => (
//                     <TableSkeleton key={index} sx={{ height: denseHeight }} />
//                   ))
//                 ) : (
//                   <>
//                     {tableData &&
//                       tableData.map((row, index) => (
//                         <GradesTableRow
//                           key={row.id}
//                           row={{ ...row, serial_no: index + 1 }}
//                           onEditRow={() => handleEditRow(row.id)}
//                           onDeleteRow={() => handleDeleteRow(row.id)}
//                         />
//                       ))}
//                   </>
//                 )}

//                 <TableEmptyRows
//                   height={denseHeight}
//                   emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
//                 />

//                 <TableNoData notFound={notFound} />
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           onPageChange={handlePageChange}
//           page={filters.offset}
//           count={bannersCount}
//           rowsPerPage={filters.limit}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }

// // ----------------------------------------------------------------------


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

import GradesTableRow from '../grades-table-row';


const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'name', label: ' Name' },
  { id: 'sections', label: 'Sections' },

  { id: 'actions ', label: 'Actions' },
];

export default function GradesListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `backoffice/grade?page=${pagination.page}&page_size=${pagination.page_size}`
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
      router.push(paths.dashboard.grades.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/grade/${id}`);

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
              name: 'Grades',
              href: paths.dashboard.grades.root,
            },
            { name: 'List' },
          ]}
        />
              <Button
          component={RouterLink}
          href={paths.dashboard.grades.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Grade
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
                      <GradesTableRow
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
