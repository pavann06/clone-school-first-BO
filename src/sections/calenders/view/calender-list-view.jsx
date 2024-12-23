

// import React, { useState, useEffect, useCallback } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Card,
//   Table,
//   Container,
//   TableBody,
//   TableContainer,
//   TablePagination,
//   Skeleton,
// } from '@mui/material';

// import Scrollbar from 'src/components/scrollbar';
// import request from 'src/api/request';
// import { TableNoData, TableHeadCustom } from 'src/components/table';

// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';
// import CalenderTableRow from '../calender-table-row';
// // import { RouterLink } from 'src/routes/components';

// const TABLE_HEAD = [
//   { id: 'prompt', label: 'Prompt' },
//   { id: 'benefit', label: 'Benefit' },
//   { id: 'description', label: 'Description' },
//   { id: 'youtube_video_url', label: 'Youtube' },
//   { id: 'date', label: 'Date' },
//   { id: 'image', label: 'Image' },
// ];

// export default function CalenderListView() {
//   const router = useRouter();
//   const [tableData, setTableData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['calendar', pagination.page, pagination.page_size],
//     queryFn: async () => {
//       const { page, page_size } = pagination;
//       const response = await request.get(
//         `https://dev-api.familifirst.com/broadcast/calendar?page=${page}&page_size=${page_size}`
//       );
//       return response;
//     },
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
//     setPagination((prev) => ({ ...prev, page: newPage + 1 }));
//   };

//   const handleRowsPerPageChange = (event) => {
//     setPagination({ page: 1, page_size: parseInt(event.target.value, 10) });
//   };
//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.calender.edit(id));
//     },
//     [router]
//   );

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
//                       <CalenderTableRow key={index} isLoading />
//                     ))
//                   : tableData.map((row) => (
//                       <CalenderTableRow
//                         key={row.id}
//                         row={row}
//                         onEditRow={() => handleEditRow(row.id)}
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


import CalenderTableRow from '../calender-table-row';
import CalenderTableToolbar from '../calender-table-toolbar';



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

  const { data, isLoading,  } = useQuery({
    queryKey: ['calendar', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `https://dev-api.familifirst.com/backoffice/broadcast/calendar?page=${pagination.page}&page_size=${pagination.page_size}`
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
      router.push(paths.dashboard.calender.edit(id));
      console.log(id.data , "id of the row")
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
                      <CalenderTableRow
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