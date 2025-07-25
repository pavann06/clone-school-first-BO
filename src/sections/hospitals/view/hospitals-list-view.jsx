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

// import HospitalsTableRow from '../hospitals-table-row';
// import HospitalsTableToolbar from '../hospitals-table-toolbar';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'No', label: 'No',  },
//   { id: 'display_name', label: 'Display Name', },
//   { id: 'city', label: 'City', },
//   { id: 'mobile', label: 'Mobile', },
//   {label: 'Actions'}

// ];

// // ----------------------------------------------------------------------

// export default function HospitalsListView() {

//   const queryClient = useQueryClient();

//   const { enqueueSnackbar } = useSnackbar();

//   const router = useRouter();

//   const table = useTable();

//   const settings = useSettingsContext();

//   const [tableData, setTableData] = useState([]);

//   const [hospitalsCount, setHospitalsCount] = useState(0);
//   const [filters, setFilters] = useState({
//     offset: 0,
//     limit: 10,
//     // feature_name: '',
//     // feature_type: 'SERVICE',

//   });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['backoffice/hospitals', filters],
//     queryFn: () => request.get('/backoffice/hospitals', filters),
//     staleTime: 24 * 60 * 60 * 1000,

//   });
//   console.log("hospital data" , data);

//   useEffect(() => {
//     if (data?.info?.length > 0) {
//       setTableData(data.info);
//       setHospitalsCount(data.total);
//     } else {
//       setTableData([]);
//       setHospitalsCount(0);
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
//       router.push(paths.dashboard.hospitals.edit(id));
//     },
//     [router]
//   );

//   const handleDeleteRow = async (id) => {

//     const response = await request.delete('backoffice/hospitals', {"id": id});

//     const { success } = response;

//     // contact creation success
//     if (success) {
//       enqueueSnackbar('Deleted successfully');

//       // invalidate cache
//       queryClient.invalidateQueries(['backoffice/hospitals']);

//       router.push(paths.dashboard.hospitals.root);
//     }
//   };

//   const handleViewRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.hospitals.view(id));

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
//               name: 'Hospitals',
//               href: paths.dashboard.hospitals.root,
//             },
//             { name: 'List' },
//           ]}
//         />
//         <Button
//           component={RouterLink}
//           href={paths.dashboard.hospitals.new}
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
//         <HospitalsTableToolbar filters={filters} setFilters={setFilters} />

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
//                         <HospitalsTableRow
//                           key={row.id}
//                           row={{ ...row, serial_no: index + 1 }}
//                           onEditRow={() => handleEditRow(row.id)}
//                           onDeleteRow={() => handleDeleteRow(row.id)}
//                           onViewRow={()=> handleViewRow(row.id)}
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
//           count={hospitalsCount}
//           rowsPerPage={filters.limit}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }

// // ----------------------------------------------------------------------
