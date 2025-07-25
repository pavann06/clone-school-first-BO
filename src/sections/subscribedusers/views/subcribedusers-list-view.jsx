
// import { useSnackbar } from 'src/components/snackbar';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect,  } from 'react';

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

import request from 'src/api/request';

import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';

import SubscribedusersTableRow from '../subscribedusers-table-row';


const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' ,width: '20%'},
  {id: 'mobile' , label : 'Number' , width: '40%'},
  {id: 'created_at' , label : 'Created Date' , width: '40%'},
 
];

export default function SubscribedusersListView() {
  // const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['subscribedusers', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `backoffice/broadcast/subscribedusers?page=${pagination.page}&page_size=${pagination.page_size}`
      ),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      const fetchedData = data?.data || [];
      setTableData(fetchedData);
      setTotalCount(data?.total || 0);
    }
  }, [data]);

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPagination({ page: 1, page_size: newPageSize });
  };



  return (
    <Container maxWidth="lg"
    >
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Subscribedusers', href: paths.dashboard.subscribedusers.root },
            { name: 'List' },
          ]}
        />
        {/* <Button
          component={RouterLink}
          href={paths.dashboard.subscribedusers.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Feed
        </Button> */}
      </Box>
      <Card 
        sx={{
          width: '70%', // Set the width to 70%
          margin: 'auto', // Horizontally center it
          marginTop: '5%', // Add some space at the top to center vertically
          display: 'flex', // Ensure content aligns properly inside
          flexDirection: 'column',
        }}
      >
        <TableContainer
      
         >
          <Scrollbar>
            <Table >
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading
                  ? [...Array(pagination.page_size)].map((_, index) => (
                      <Skeleton key={index} variant="rectangular" height={40} />
                    ))
                  : tableData.map((row, index) => (
                      <SubscribedusersTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no:
                            (pagination.page - 1) * pagination.page_size +
                            index +
                            1,
                        }}
                        // onEditRow={() => handleEditRow(row.id)}
                        // onDeleteRow={() => handleDeleteRow(row.id)}
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
