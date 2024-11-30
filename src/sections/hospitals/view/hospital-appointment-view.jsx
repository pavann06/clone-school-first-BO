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
// import PropTypes from 'prop-types'; 

// import AppointmentsTableRow from '../appointment-table-row';
// import HospitalsTableToolbar from '../hospitals-table-toolbar';

// // ----------------------------------------------------------------------


// const TABLE_HEAD = [
//   { id: 'No', label: 'No',  },
//   { id: 'booking_id', label: 'Booking Id', },
//   { id: 'doctor_name', label: 'Doctor Name', },
 
//   {id: 'full_name',label: 'Full Name'},
//   { id: 'mobile', label: 'Mobile', },
  
//   {label: 'Actions'}
 
 
// ];

// // ----------------------------------------------------------------------

// export default function AppointmentsListView({id}) {

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
    
//   });




// const { data, isLoading, isError } = useQuery({
//   queryKey: ['backoffice','hospitals','doctors','appointments', id ,filters], 
//   queryFn: () => request.get(`/backoffice/hospitals/doctors/appointments?hospital=${id}&offset=${filters.offset}&limit=${filters.limit}`), 
//   staleTime: 24 * 60 * 60 * 1000,
// });


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
//                         <AppointmentsTableRow
//                           key={row.id}
//                           row={{ ...row, serial_no: index + 1 }}
//                           // onEditRow={() => handleEditRow(row.id)}
//                           // onDeleteRow={() => handleDeleteRow(row.id)}
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
// AppointmentsListView.propTypes = {
//   id: PropTypes.string,
// };

// // ----------------------------------------------------------------------


import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { TablePagination } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField'; // Import TextField for date picker

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import request from 'src/api/request';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';
import PropTypes from 'prop-types';
import AppointmentsTableRow from '../appointment-table-row';
import HospitalsTableToolbar from '../hospitals-table-toolbar';

// ----------------------------------------------------------------------






const TABLE_HEAD = [
  { id: 'No', label: 'No' },
  { id: 'booking_id', label: 'Booking Id' },
  { id: 'doctor_name', label: 'Doctor Name' },
  { id: 'full_name', label: 'Full Name' },
  { id: 'mobile', label: 'Mobile' },
  { id : 'fee' , label: 'Amount' },
  { id : 'status', label : 'Status'},
  // { label: 'Actions' },
];

//---------------------------------------------------------------------

export default function AppointmentsListView({ id }) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const table = useTable();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [hospitalsCount, setHospitalsCount] = useState(0);
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    start_date: '',
    end_date: '',
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['backoffice', 'hospitals', 'doctors', 'appointments', id, filters],
    queryFn: () =>
      request.get(
        `/backoffice/hospitals/doctors/appointments?hospital=${id}&offset=${filters.offset}&limit=${filters.limit}&start_date=${filters.start_date}&end_date=${filters.end_date}`
      ),
      
    staleTime: 24 * 60 * 60 * 1000,
    
  });

  useEffect(() => {
    if (data?.info?.length > 0) {
      setTableData(data.info);
      setHospitalsCount(data.total);
    } else {
      setTableData([]);
      setHospitalsCount(0);
    }
    console.log(data , 'apppintments data')
  }, [data]);

  const handlePageChange = (event, newPage) => {
    setFilters({
      ...filters,
      offset: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilters({
      ...filters,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    });
  };

  const handleDateChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const denseHeight = table.dense ? 60 : 80;
  const notFound = isError;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Hospitals',
              href: paths.dashboard.hospitals.root,
            },
            { name: 'List' },
          ]}
        />
        {/* <Button
          component={RouterLink}
          href={paths.dashboard.hospitals.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Hospital
        </Button> */}
      </Box>

      <Card>
        <HospitalsTableToolbar filters={filters} setFilters={setFilters} />

        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.start_date}
            onChange={handleDateChange('start_date')}
          />
           <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.end_date}
            onChange={handleDateChange('end_date')}
          /> 
        </Box>

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {isLoading ? (
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {tableData &&
                      tableData.map((row, index) => (
                        <AppointmentsTableRow
                          key={row.id}
                          row={{ ...row, serial_no: index + 1 }}
                        />
                      ))}
                  </>
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          component="div"
          onPageChange={handlePageChange}
          page={filters.offset}
          count={hospitalsCount}
          rowsPerPage={filters.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

AppointmentsListView.propTypes = {
  id: PropTypes.string,
};
