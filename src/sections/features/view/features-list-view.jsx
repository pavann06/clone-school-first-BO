import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
import { useSnackbar } from 'src/components/snackbar';
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

import FeaturesTableRow from '../features-table-row';
import FeaturesTableToolbar from '../features-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'No', label: 'No' },
  { id: 'feature_name', label: 'Feature' },
  { id: 'feature_type', label: 'Entity' },
  { id: 'actions', label: 'Actions' },
];

// ----------------------------------------------------------------------

export default function FeaturesListView() {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const table = useTable();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [featuresCount, setFeaturesCount] = useState(0);
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    feature_name: '',
    feature_type: 'SERVICE',
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['features', filters],
    queryFn: () => request.get('/features', filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.info?.length > 0) {
      setTableData(data.info);
      setFeaturesCount(data.total);
    } else {
      setTableData([]);
      setFeaturesCount(0);
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
      router.push(paths.dashboard.features.edit(id));
    },
    [router]
  );

  const handleDeleteRow = async (id) => {
    const response = await request.delete('features', { id });

    const { success } = response;

    // contact creation success
    if (success) {
      enqueueSnackbar('Deleted successfully');

      // invalidate cache
      queryClient.invalidateQueries(['features']);

      router.push(paths.dashboard.features.root);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Feature',
              href: paths.dashboard.features.root,
            },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.features.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Feature
        </Button>
      </Box>

      <Card>
        <FeaturesTableToolbar filters={filters} setFilters={setFilters} />

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
                        <FeaturesTableRow
                          key={row.id}
                          row={{ ...row, serial_no: index + 1 }}
                          onEditRow={() => handleEditRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
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
          count={featuresCount}
          rowsPerPage={filters.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------
