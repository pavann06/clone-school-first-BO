


import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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

import GradesTableRow from '../grades-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'name', label: 'Name' },
  { id: 'sections', label: 'Sections' },
  { id: 'actions', label: 'Actions' },
];

export default function GradesListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [schoolId, setSchoolId] = useState('');
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  // ✅ Fetch schools
  const { data: schoolsData } = useQuery({
    queryKey: ['schools'],
    queryFn: () => request.get('backoffice/school'),
  });

  // ✅ Fetch grades based on selected school
  const { data, isLoading } = useQuery({
    queryKey: ['grades', pagination.page, pagination.page_size, schoolId],
    queryFn: () =>
      request.get(
        `backoffice/grade?page=${pagination.page}&page_size=${pagination.page_size}&school_id=${schoolId}`
      ),
    enabled: !!schoolId, // fetch only when school is selected
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
      router.push(paths.dashboard.grades.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/grade/${id}`);
    if (response?.success) {
      enqueueSnackbar('Deleted successfully');
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
            { name: 'Grades', href: paths.dashboard.grades.root },
            { name: 'List' },
          ]}
        />

        <Button
          component={RouterLink}
          href={paths.dashboard.grades.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Grade
        </Button>
      </Box>

      {/* ✅ Dropdown to select school */}
      <Box sx={{ mb: 3, width: 300 }}>
        <FormControl fullWidth>
          <InputLabel>Select School</InputLabel>
          <Select
            value={schoolId}
            label="Select School"
            onChange={(e) => {
              setSchoolId(e.target.value);
              setPagination({ page: 1, page_size: pagination.page_size }); // Reset page
            }}
          >
            {schoolsData?.data?.map((school) => (
              <MenuItem key={school.id} value={school.id}>
                {school.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
                      <GradesTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no:
                            (pagination.page - 1) * pagination.page_size +
                            index +
                            1,
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
