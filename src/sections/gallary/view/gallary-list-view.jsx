


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
  Tabs,
  Tab,
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
import GallaryTableRow from '../gallary-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'event_name', label: 'Event Nname' },
  { id: 'description', label: 'Description' },
  { id: 'event_date', label: 'Event date' },

  { id: 'number_of_pics', label: 'Number of Pics' },
  
  { id: 'actions', label: 'Actions' },
];

export default function GallaryListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });
  const [selectedTab, setSelectedTab] = useState('Pending'); // Set default to Pending

  const { data, isLoading , refetch } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size, selectedTab],
    queryFn: () =>
      request.get(
        `backoffice/get/gallery?page=${pagination.page}&page_size=${pagination.page_size}`
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
      router.push(paths.dashboard.gallary.edit(id));
    },
    [router]
  );


  const handleDeleteRow = async (id) => {
    try {
      const response = await request.delete(`backoffice/gallery/${id}`);
      if (response.success) {
        enqueueSnackbar('Deleted successfully');
        refetch();
      }
    } catch (error) {
      enqueueSnackbar('Failed to delete', { variant: 'error' });
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setPagination({ page: 1, page_size: 10 });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Gallary', href: paths.dashboard.gallary.root },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.gallary.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Gallary
        </Button>
      </Box>

      {/* Only show Pending, Approved, and Rejected */}
     


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
                      <GallaryTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
                        }}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        refetch={refetch} 
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
