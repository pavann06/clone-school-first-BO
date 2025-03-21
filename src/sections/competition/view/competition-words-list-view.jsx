// import React, { useState, useEffect } from 'react';
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

import PropTypes from 'prop-types';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

import request from 'src/api/request';
import { useParams } from 'react-router-dom';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import { label } from 'yet-another-react-lightbox';

import CompetitionWordsTableRow from '../competition-words-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'word', label: 'word' },
  { id: 'points', label: 'points' },
  { id: 'parts_of_speech', label: 'parts_of_speech' },
  { id: 'definition', label: 'definition' },

  { id: 'usage', label: 'usage' },

  { id: 'actions ', label: 'Actions' },
];

export default function CompetionWordsListView({competitionId}) {


  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });



  const { data, isLoading } = useQuery({
    queryKey: ['cometition_words', competitionId, pagination.page, pagination.page_size], 
    queryFn: () =>
      request.get(
        `backoffice/contestword?contest_id=${competitionId}&page=${pagination.page}&page_size=${pagination.page_size}`
      ),
    keepPreviousData: true,
  });

  

  // Set data when fetched successfully
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

  // Handle change in number of rows per page
  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPagination({ page: 1, page_size: newPageSize });
  };

 

//   const handleEditRow = useCallback(
//     (feedId) => {
//       router.push(paths.dashboard.competition.competition_words.edit(competitionId, feedId)); 
//     },
//     [router, groupId]
//   );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/forum/feeds/${id}`);

    const { success } = response;

    if (success) {
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
          
            { name: 'Words', href: paths.dashboard.competition.competition_words.root(competitionId) }, 
            { name: 'List' },
          ]}
        />

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
                    <CompetitionWordsTableRow
                    key={row.id || `word-${index}`}     
                    row={{
                      ...row,
                      serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
                    }}
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

CompetionWordsListView.propTypes = {
  competitionId: PropTypes.string.isRequired,// Ensure groupId is a required string
};
