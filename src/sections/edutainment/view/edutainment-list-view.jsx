



import React, { useState, useEffect } from 'react';


import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import Scrollbar from 'src/components/scrollbar';
import { TableNoData, TableHeadCustom } from 'src/components/table';
import request from 'src/api/request';

const TABLE_HEAD = [
  { id: 'language', label: 'Language' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'interaction', label: 'Interaction' },
  { id: 'created_date', label: 'Created Date' },
  { id: 'approved_date', label: 'Approved Date' },
  { id: 'post_date', label: 'Post Date' },
  { id: 'actions', label: 'Actions' },
];

export default function EdutainmentListView({ id }) {
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ offset: 1, limit: 10 });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['edutainment', id],
    queryFn: () => {
      if (!id) {
        throw new Error('ID is required to fetch data');
      }
      return request.get(`https://dev-api.familifirst.com/edutain/feeds/${id}/`);
    },
    enabled: !!id, // Only fetch data when ID is provided
  });
  
  

  useEffect(() => {
    if (data) {
      console.log('API Response:', data); // Log the entire API response
      if (data?.info?.length > 0) {
        setTableData(data.info);
        setTotalCount(data.total);
      } else {
        setTableData([]);
        setTotalCount(0);
      }
    }
  }, [data]);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, offset: newPage }));
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setPagination({ offset: 0, limit: parseInt(event.target.value, 10) });
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <TableContainer>
          <Scrollbar>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading
                  ? // Show loading skeleton
                    [...Array(10)].map((_, index) => (
                      <tr key={index}>
                        <td>Loading...</td>
                      </tr>
                    ))
                  : tableData.map((row) => (
                      <tr key={row.id}>
                        {TABLE_HEAD.map((col) => (
                          <td key={col.id}>{row[col.id]}</td>
                        ))}
                      </tr>
                    ))}
                {!isLoading && tableData.length === 0 && (
                  <TableNoData />
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalCount}
          page={pagination.offset}
          rowsPerPage={pagination.limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}
