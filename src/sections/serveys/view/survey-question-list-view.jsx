
import React, { useState,  } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Card,
  Table,
  Button,
  Skeleton,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSnackbar } from 'src/components/snackbar';

import request from 'src/api/request';
import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';

import ServeyQuestionsTableRow from '../survey-questions-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'question', label: 'Question' },
  { id: 'options', label: 'Options' },
  { id: 'question_type', label: 'Question Type' },
  { id: 'actions', label: 'Actions' },
];

export default function SurveyQuestionListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id: survey_id } = useParams();
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['survey', survey_id, pagination.page, pagination.page_size],
    queryFn: () =>
      request.get(
        `survey/${survey_id}/question?page=${pagination.page}&page_size=${pagination.page_size}`
      ),
    keepPreviousData: true,
  });

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    setPagination({ page: 1, page_size: parseInt(event.target.value, 10) });
  };

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/survey/question/${id}`);

    const { success } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar('Deleted successfully');

      // refetch the data
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };
  const handleEditRow = (questionId) => {
    router.push(paths.dashboard.survey.questions_edit(survey_id, questionId));
    
  };




  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="Survey Question List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Survey', href: paths.dashboard.survey.root },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.survey.questions_new(survey_id)} // Dynamic path for new question
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ position: 'absolute', bottom: '5px', right: '5px' }}
        >
          New Question
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
                  : data?.data.map((row, index) => (
                      <ServeyQuestionsTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
                        }}
                        // onEditRow={() => handleEditRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                       
                      />
                    ))}
                {!isLoading && data?.data?.length === 0 && <TableNoData />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePagination
          component="div"
          count={data?.total || 0}
          page={pagination.page - 1}
          rowsPerPage={pagination.page_size}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}
