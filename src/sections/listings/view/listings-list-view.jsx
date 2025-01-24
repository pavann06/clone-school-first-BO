


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
  FormControl, 
  InputLabel ,
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

import ListingsTableRow from '../listings-table-row';
import BusinessCategoriesDropdown from '../business-categories-dropdown';



const TABLE_HEAD = [
  { id: 'index', label: 'Serial No' },
  { id: 'business_name', label: 'Business Name' },
  { id: 'description', label: 'Description' },
  { id: 'tags', label: 'Tags ' },
  { id: 'thumbnail', label: 'Image' },
  { id: 'services', label: 'Services ' },
  { id: 'status', label: 'Status' },
  { id: 'actions ', label: 'Actions' },
];

export default function ListingsListView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['listings', pagination.page, pagination.page_size, selectedCategory, selectedSubcategory],
    queryFn: () => {
      const categoryFilter = selectedCategory ? `&category=${selectedCategory}` : '';
      const subcategoryFilter = selectedSubcategory ? `&subcategory=${selectedSubcategory}` : '';

      return request.get(
        `backoffice/business/listings?page=${pagination.page}&page_size=${pagination.page_size}${categoryFilter}${subcategoryFilter}`
      );
    },
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
      router.push(paths.dashboard.listings.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete(`backoffice/business/categories/${id}`);

    const { success } = response;

    if (success) {
      enqueueSnackbar('Deleted successfully');
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null); // Reset subcategory when category changes
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Listings',
              href: paths.dashboard.listings.root,
            },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.listings.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Listing
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '290px' }}>
  <FormControl fullWidth>
    <InputLabel>Select Category</InputLabel>
    <BusinessCategoriesDropdown onChange={handleCategoryChange} />
  </FormControl>
</Box>

        {/* <BusinessSubcategoriesDropdown
          categoryId={selectedCategory}
          onChange={handleSubcategoryChange}
          value={selectedSubcategory}
          categoryName={selectedCategory ? 'Selected Category' : ''}
        /> */}

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
                      <ListingsTableRow
                        key={row.id}
                        row={{
                          ...row,
                          serial_no: (pagination.page - 1) * pagination.page_size + index + 1,
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


