


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
import EdutainmentTableRow from '../edutainment-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'approved_date', label: 'Approved' },
  { id: 'image', label: 'Image' },
  { id: 'likes_count', label: 'Likes' },
  { id: 'language', label: 'Language' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

export default function EdutainmentListView() {
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
        `backoffice/edutain/feeds?page=${pagination.page}&page_size=${pagination.page_size}&status=${selectedTab}`
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

  // const handleDeleteRow = async (id) => {
  //   const response = await request.delete(`backoffice/edutain/feeds/${id}`);
  //   const { success } = response;
  //   if (success) {
  //     enqueueSnackbar('Deleted successfully');
  //     setPagination((prev) => ({ ...prev, page: 1 }));
  //   }
  // };
  const handleDeleteRow = async (id) => {
    try {
      const response = await request.delete(`backoffice/edutain/feeds/${id}`);
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
            { name: 'Edutainment', href: paths.dashboard.edutainment.root },
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

      {/* Only show Pending, Approved, and Rejected */}
      <Tabs
  value={selectedTab}
  onChange={handleTabChange}
 
  sx={{
    minHeight: 36, // reduces overall height
    '& .MuiTab-root': {
      minHeight: 36,
      paddingY: 1.5,
      paddingX: 1.5,
      fontSize: 13,
    },
    '& .MuiTabs-indicator': {
      height: 2,
    },
  }}
>
  <Tab label="Pending" value="Pending" />
  <Tab label="Approved" value="Approved" />
  <Tab label="Rejected" value="Rejected" />
</Tabs>


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
