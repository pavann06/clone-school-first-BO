


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
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import request from 'src/api/request';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import { paths } from 'src/routes/paths';
import SurveyTableRow from '../survey-table-row';



const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'duration', label: 'Duration (mins)' },
 

  { id: 'status', label: 'Status' },
  { id: 'total_responses' , label: 'Total Response'},
  { id: 'closing_date', label: 'Closing Date' },
  
  { id: 'number_of_questions', label: 'Number of Questions' },
  { id: 'actions', label: 'Actions' },
];

export default function SurveyListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading,  } = useQuery({
    queryKey: ['survey', pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(`backoffice/survey?page=${pagination.page}&page_size=${pagination.page_size}`),
    keepPreviousData: true,
    onError: (err) => {
      enqueueSnackbar(`Error fetching data: ${err.message}`, { variant: 'error' });
    },
  });

  useEffect(() => {
    if (data) {
      setTableData(data.data || []);
      setTotalCount(data.total || 0);
    }
  }, [data]);

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    setPagination({ page: 1, page_size: parseInt(event.target.value, 10) });
  };

    const handleEditRow = useCallback(
      (id) => {
        router.push(paths.dashboard.survey.edit(id));
      },
      [router]
    );

    const handleDeleteRow = async (id) => {
      const response = await request.delete(`backoffice/survey/${id}`);
  
      const { success } = response;
  
      // contact creation success
      if (success) {
        enqueueSnackbar('Deleted successfully');
  
        // refetch the data
        setPagination((prev) => ({ ...prev, page: 1 }));
      }
    };
  

 
  const handleViewRow = useCallback(
    (id) => {
      const targetPath = paths.dashboard.survey.questions(id);
      console.log('Navigating to:', targetPath); // Debug log
      router.push(targetPath);
    },
    [router]
  );
  

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="Survey List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Survey', href: paths.dashboard.survey.root },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.survey.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ position: 'absolute', bottom: '5px', right: '5px' }}
        >
          New Survey
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
                      <Skeleton key={index} variant="rectangular" height={40} />
                    ))
                  : tableData.map((row, index) => (
                      <SurveyTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
                        }}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => {
                          console.log('Row ID:', row.id); // Debugging log
                          handleViewRow(row.id);
                        }}
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
