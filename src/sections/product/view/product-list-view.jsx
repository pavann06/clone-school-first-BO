import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { TablePagination } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import request from 'src/api/request';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import ProductTableRow from '../product-table-row';
import ProductTableToolbar from '../product-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'No', label: 'No', width: 150 },
  { id: 'name', label: 'Product' ,width:400},
  { id: 'inventoryType', label: 'Stock', width: 200 },
  { id: 'is_active', label: 'Status', width: 160 },
  { id: 'actions', label: 'Action', width: 100 },
];

// ----------------------------------------------------------------------

export default function ProductListView() {
  const router = useRouter();

  const table = useTable();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [produtCount, setProductCount] = useState(0);
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => request.get('/products', filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.info?.length > 0) {
      setTableData(data.info);
      setProductCount(data.total);
    } else {
      setTableData([]);
      setProductCount(0);
    }
  }, [data]);

  const handlePageChange = (event, newPage) => {
    setFilters({
      ...filters,
      offset: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilters({
      ...filters,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    });
  };

  const denseHeight = table.dense ? 60 : 80;

  const notFound = isError;

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Product',
              href: paths.dashboard.product.root,
            },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.product.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Product
        </Button>
      </Box>

      <Card>
        <ProductTableToolbar filters={filters} setFilters={setFilters} />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {isLoading ? (
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {tableData &&
                      tableData.map((row, index) => (
                        <ProductTableRow
                          key={row.id}
                          row={{ ...row, serial_no: index + 1 }}
                          onEditRow={() => handleEditRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                        />
                      ))}
                  </>
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          component="div"
          onPageChange={handlePageChange}
          page={filters.offset}
          count={produtCount}
          rowsPerPage={filters.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------
