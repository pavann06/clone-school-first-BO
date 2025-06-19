import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
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
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import request from 'src/api/request';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import EventsTableRow from '../events-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'date', label: 'Date' },
  { id: 'time', label: 'Time' },
  { id: 'color_code', label: 'Color Code' },
  { id: 'actions', label: 'Actions' },
];

export default function EventsListView() {
  const navigate = useNavigate();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['events', pagination.page, pagination.page_size],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pagination.page,
        page_size: pagination.page_size,
      });

      try {
        const response = await request.get(`backoffice/events?${params.toString()}`);
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

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage + 1,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPagination({ page: 1, page_size: newPageSize });
  };

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.events.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    try {
      const response = await request.delete(`backoffice/events/${id}`);
      if (response.success) {
        enqueueSnackbar('Deleted successfully');
        refetch();
      }
    } catch (error) {
      enqueueSnackbar('Failed to delete', { variant: 'error' });
    }
  };

  const tableData = data?.data || [];
  const totalCount = data?.total || 0;

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="Events List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Events', href: paths.dashboard.events.root },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.events.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ position: 'absolute', bottom: '5px', right: '5px' }}
        >
          New Event
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Scrollbar>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading &&
                  [...Array(pagination.page_size)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" height={40} />
                  ))}

                {!isLoading &&
                  tableData.length > 0 &&
                  tableData.map((row, index) => (
                    <EventsTableRow
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
