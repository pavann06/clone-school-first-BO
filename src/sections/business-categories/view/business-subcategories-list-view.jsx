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

import BusinessSubCategoriesTableRow from '../business-subcategories-table-row';

const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'feed_type', label: 'Feed Type' },
  { id: 'heading', label: 'Heading' },
  { id: 'description', label: 'Description' },
  { id: 'language', label: 'Language' },

  { id: 'image', label: 'Image' },

  { id: 'likes_count', label: 'Likes ' },

  // {id: 'trending' , label : 'Trending'},
  { id: 'comment_type', label: 'Comment Type' },
  { id: 'status', label: 'Status' },
  { id: 'actions ', label: 'Actions' },
];

export default function BusinessSubCategoriesListView({categoriesId}) {


  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });



  const { data, isLoading } = useQuery({
    queryKey: ['forum_feeds', categoriesId, pagination.page, pagination.page_size], 
    queryFn: () =>
      request.get(
        `backoffice/forum/feeds?group_id=${categoriesId}&page=${pagination.page}&page_size=${pagination.page_size}`
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

 

  const handleEditRow = useCallback(
    (subcategoryId) => {
      router.push(paths.dashboard.groups.forumFeeds.edit(categoriesId, subcategoryId)); 
    },
    [router, categoriesId]
  );

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
          
            { name: 'Feeds', href: paths.dashboard.groups.forumFeeds.root(categoriesId) }, 
            { name: 'List' },
          ]}
        />

        <Button
          component={RouterLink}
          variant="contained"
          href={paths.dashboard.groups.forumFeeds.new(categoriesId)} 
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
                      <BusinessSubCategoriesTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no: (pagination.page - 1) * pagination.page_size + index + 1, // Updated serial number calculation
                        }}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        //  onViewRow={()=> handleViewRow(row.id)}
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

BusinessSubCategoriesListView.propTypes = {
    categoriesId: PropTypes.string.isRequired,// Ensure groupId is a required string
};
