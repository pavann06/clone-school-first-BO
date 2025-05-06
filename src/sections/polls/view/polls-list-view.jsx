// imp-----------------------------

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

import request from 'src/api/request';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';

import PollsTableRow from '../polls-table-row';


const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'question', label: 'Question' },
  { id: 'options', label: 'Options' },
  { id: 'answer', label: 'Answer ' },
  { id: 'description', label: 'Description ' },
  { id: 'total_responses' , label:'Total Responses'},
  { id: 'actions ', label: 'Actions' },
];

export default function PollsListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(`backoffice/poll?page=${pagination.page}&page_size=${pagination.page_size}`),
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
      router.push(paths.dashboard.polls.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/poll/${id}`);

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
              name: 'Polls',
              href: paths.dashboard.polls.root,
            },
            { name: 'List' },
          ]}
        />
             <Button
          component={RouterLink}
          href={paths.dashboard.polls.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Poll
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
                      <Skeleton key={`skeleton-${index}`} variant="rectangular" height={40} />
                    ))
                  : tableData.map((row, index) => (
                      <PollsTableRow
                        key={`poll-row-${row.id}`} // Ensure each key is unique with a prefix
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
