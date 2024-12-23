

// imp-----------------------------

import React, { useState, useEffect ,useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  Table, 
  Container, 
  TableBody, 
  TableContainer, 
  TablePagination, 
  Skeleton 
} from '@mui/material';

import Scrollbar from 'src/components/scrollbar';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import request from 'src/api/request';
import { TableNoData, TableHeadCustom } from 'src/components/table';


import EdutainmentTableRow from '../edutainment-table-row';



const TABLE_HEAD = [
  { id: "index", label: "Serial No" }, 
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'approved_date', label: 'Approved ' },
  { id: 'image', label: 'Image' },
  { id: 'likes_count' , label : "Likes "},
  { id: 'language' , label : 'language'},
  {id: 'actions ', label :"Actions"},
];

export default function EdutainmentListView() {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading,  } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `https://dev-api.familifirst.com/backoffice/edutain/feeds?page=${pagination.page}&page_size=${pagination.page_size}`
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
      router.push(paths.dashboard.edutainment.edit(id));
    },
    [router]
  
  );

  const handleDeleteRow = (id) => {
    console.log('Delete row with ID:', id); 
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
                      <Skeleton key={index} variant="rectangular" height={40} />
                    ))
                  : tableData.map((row) => (
                      <EdutainmentTableRow
                        key={row.id}
                        row={{ ...row, id: Number(row.id) }} 
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

// import { useState, useEffect, useCallback } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

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

// import EdutainmentTableRow from '../edutainment-table-row';
// import EdutainmentTableToolbar from '../edutainment-table-toolbar';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: "index", label: "Serial No" },
//   { id: 'heading', label: 'Heading' },
//   { id: 'description', label: 'Description' },
//   { id: 'approved_date', label: 'Approved' },
//   { id: 'image', label: 'Image' },
//   { id: 'likes_count', label: "Likes" },
//   { id: 'language', label: 'Language' },
//   { id: 'actions', label: "Actions" },
// ];

// // ----------------------------------------------------------------------

// export default function EdutainmentListView() {
//   const queryClient = useQueryClient();
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();
//   const table = useTable();
//   const settings = useSettingsContext();

//   const [tableData, setTableData] = useState([]);
//   const [FeedsCount, setFeedsCount] = useState(0);

//   const [filters, setFilters] = useState({
//     page: 1,       // Set the default page as 0 (because most APIs start from 0)
//     page_size: 10, // Default to 10 rows per page
//   });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['backoffice/edutainment', filters],
//     queryFn: () => {
//       const queryString = new URLSearchParams(filters).toString();
//       return request.get(`https://dev-api.familifirst.com/backoffice/edutain/feeds?${queryString}`);
//     },
//     staleTime: 24 * 60 * 60 * 1000, // Cache for 1 day
//   });

//   useEffect(() => {
//     if (data && data.info && Array.isArray(data.info) && data.info.length > 0) {
//       setTableData(data.info);
//       setFeedsCount(data.total);
//     } else {
//       setTableData([]);
//       setFeedsCount(0);
//     }
//   }, [data]);

//   const handlePageChange = (event, newPage) => {
//     setFilters((prev) => ({
//       ...prev,
//       page: newPage + 1, // Update the page number
//     }));
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     setFilters({
//       ...filters,
//       page_size: newPageSize,
//       page: 1, // Reset to first page when rows per page change
//     });
//   };

//   const denseHeight = table.dense ? 60 : 80;

//   const notFound = isError || (data && data.info.length === 0);

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.edutainment.edit(id));
//     },
//     [router]
//   );

//   const handleDeleteRow = async (id) => {
//     const response = await request.delete('backoffice/hospitals', { id });
//     const { success } = response;

//     if (success) {
//       enqueueSnackbar('Deleted successfully');
//       queryClient.invalidateQueries(['backoffice/edutainment']);
//       router.push(paths.dashboard.edutainment.root);
//     }
//   };

//   const handleViewRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.edutainment.view(id));
//     },
//     [router]
//   );

//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'lg'}>
//       <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
//         <CustomBreadcrumbs
//           heading="List"
//           links={[
//             { name: 'Dashboard', href: paths.dashboard.root },
//             {
//               name: 'Edutainment',
//               href: paths.dashboard.edutainment.root,
//             },
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
//           New Hospital
//         </Button>
//       </Box>

//       <Card>
//         <EdutainmentTableToolbar filters={filters} setFilters={setFilters} />

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
//                   [...Array(filters.page_size)].map((_, index) => (
//                     <TableSkeleton key={index} sx={{ height: denseHeight }} />
//                   ))
//                 ) : (
//                   <>
//                     {tableData &&
//                       tableData.map((row, index) => (
//                         <EdutainmentTableRow
//                           key={row.id}
//                           row={{ ...row, serial_no: index + 1 }}
//                           onEditRow={() => handleEditRow(row.id)}
//                           onDeleteRow={() => handleDeleteRow(row.id)}
//                           onViewRow={() => handleViewRow(row.id)}
//                         />
//                       ))}
//                   </>
//                 )}

//                 <TableEmptyRows
//                   height={denseHeight}
//                   emptyRows={emptyRows(table.page, filters.page_size, tableData.length)}
//                 />

//                 <TableNoData notFound={notFound} />
//               </TableBody>
//             </Table>
//           </Scrollbar>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           onPageChange={handlePageChange}
//           page={filters.page -1} // Ensure page is 0-based for API requests
//           count={FeedsCount}
//           rowsPerPage={filters.page_size}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }
