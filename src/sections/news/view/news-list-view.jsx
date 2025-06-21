

import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import {
  Box,
  Card,
  Tab,
  Tabs,
  Table,
  Skeleton,
  Button,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import request from 'src/api/request';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import NewsTableRow from '../news-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'categories', label: 'Categories' },
  { id: 'images', label: 'Images' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

// Modified tabs to only show Approved, Pending, and Rejected
const TABS = ['Pending', 'Approved', 'Rejected'];

export default function NewsListView() {
  const navigate = useNavigate();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [activeTab, setActiveTab] = useState('Pending');
  const [paginationState, setPaginationState] = useState({
    Approved: { page: 1, page_size: 10 },
    Pending: { page: 1, page_size: 10 },
    Rejected: { page: 1, page_size: 10 },
  });

  const currentPagination = paginationState[activeTab];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['news', activeTab, currentPagination.page, currentPagination.page_size],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPagination.page,
        page_size: currentPagination.page_size,
      });

      if (activeTab !== 'All') {
        params.append('status', activeTab);
      }

      try {
        const response = await request.get(`backoffice/news?${params.toString()}`);
        return response;
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/auth/login?returnTo=%2Fdashboard');
        }
        throw err;
      }
    },
    keepPreviousData: true,
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePageChange = (event, newPage) => {
    setPaginationState((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], page: newPage + 1 },
    }));
  };

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.news.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    try {
      const response = await request.delete(`backoffice/news/${id}`);
      if (response.success) {
        enqueueSnackbar('Deleted successfully');
        refetch();
      }
    } catch (error) {
      enqueueSnackbar('Failed to delete', { variant: 'error' });
    }
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationState((prev) => ({
      ...prev,
      [activeTab]: { page: 1, page_size: newPageSize },
    }));
  };

  const tableData = data?.data || [];
  const totalCount = data?.total || 0;

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="News List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'News', href: paths.dashboard.news.root },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.news.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ position: 'absolute', bottom: '5px', right: '5px' }}
        >
          New News
        </Button>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {TABS.map((status) => (
          <Tab key={status} label={status} value={status} />
        ))}
      </Tabs>

      <Card>
        <TableContainer>
          <Scrollbar>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading &&
                  [...Array(currentPagination.page_size)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" height={40} />
                  ))}

                {!isLoading &&
                  tableData.length > 0 &&
                  tableData.map((row, index) => (
                    <NewsTableRow
                      key={row.id}
                      row={{
                        ...row,
                        serial_no:
                          (currentPagination.page - 1) * currentPagination.page_size + index + 1,
                      }}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      refetch={refetch} // Pass refetch to the row component
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
          page={currentPagination.page - 1}
          rowsPerPage={currentPagination.page_size}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}
