import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import { TablePagination } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useTable } from 'src/hooks/use-table-sort';

import request from 'src/api/request';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import PurchaseAnalytic from '../purchase-analytic';
import PurchseTableRow from '../purchase-table-row';
import PurchaseTableToolbar from '../purchase-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'S_No', label: 'S_No' },
  { id: 'order_no', label: 'Supplier' },
  { id: 'organizer_name', label: 'Organizer' },
  { id: 'order_date', label: 'Date' },
  { id: 'final_amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

// ----------------------------------------------------------------------

export default function PurchaseListView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const { order, orderBy, onSort, filters, setFilters } = useTable();

  const [tableData, setTableData] = useState([]);

  const [purchaseCount, setPurchaseCount] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['purchases', filters],
    queryFn: () => request.get('/purchases', filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.info?.length > 0) {
      setTableData(data.info);
      setPurchaseCount(data.total);
    } else {
      setTableData([]);
      setPurchaseCount(0);
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

  const denseHeight = 76;

  const notFound = isError;

  // const getInvoiceLength = (status) => tableData.filter((item) => item.status === status).length;

  // const getTotalAmount = (status) =>
  //   sumBy(
  //     tableData.filter((item) => item.status === status),
  //     'totalAmount'
  //   );

  // const getPercentByStatus = (status) => (getInvoiceLength(status) / tableData.length) * 100;

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.purchase.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.purchase.details(id));
    },
    [router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: 'Purchase',
              href: paths.dashboard.purchase.root,
            },
            {
              name: 'List',
            },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.purchase.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Purchase
        </Button>
      </Box>

      <Card
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Scrollbar>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <PurchaseAnalytic
              title="Total"
              total={purchaseCount}
              percent={100}
              price={100}
              icon="solar:bill-list-bold-duotone"
              color={theme.palette.info.main}
            />

            <PurchaseAnalytic
              title="Paid"
              total={purchaseCount}
              percent={100}
              price={100}
              icon="solar:file-check-bold-duotone"
              color={theme.palette.success.main}
            />

            <PurchaseAnalytic
              title="Pending"
              total={purchaseCount}
              percent={100}
              price={100}
              icon="solar:sort-by-time-bold-duotone"
              color={theme.palette.warning.main}
            />

            <PurchaseAnalytic
              title="Overdue"
              total={purchaseCount}
              percent={100}
              price={100}
              icon="solar:bell-bing-bold-duotone"
              color={theme.palette.error.main}
            />
          </Stack>
        </Scrollbar>
      </Card>

      <Card>
        <PurchaseTableToolbar filters={filters} setFilters={setFilters} />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={0}
                onSort={onSort}
              />

              <TableBody>
                {isLoading ? (
                  [...Array(filters.limit)].map((_, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {tableData.map((row, index) => (
                      <PurchseTableRow
                        key={row.id}
                        row={{ ...row, serial_no: index + 1 }}
                        selected={false}
                        onSelectRow={() => { }}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                  </>
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(filters.offset, filters.limit, tableData.length)}
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
          count={purchaseCount}
          rowsPerPage={filters.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------
