import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import request from 'src/api/request';
// import { ORDER_STATUS_OPTIONS } from 'src/_mock';

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
  TablePaginationCustom,
} from 'src/components/table';

import PaymentsTableRow from '../payments-table-row';
import PaymentsTableToolbar from '../payments-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'No', label: 'S_No', width: 120 },
  { id: 'contact_name', label: 'Contact', width: 300 },
  { id: 'payment_date', label: 'Date', width: 120 },
  { id: 'totalAmount', label: 'Amount', width: 120 },
  { id: 'payment_type', label: 'Type', width: 120 },
  { id: 'remarks', label: 'Remarks', width: 300 },
  { id: 'actions', label: 'Actions', width: 50 },
];

// ----------------------------------------------------------------------

export default function PaymentListView() {
  // const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  const [paymentsCount, setPaymentsCount] = useState(0);

  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['payments', filters],
    queryFn: () => request.get('/payments', filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.info?.length > 0) {
      setTableData(data.info);
      setPaymentsCount(data.total);
    } else {
      setTableData([]);
      setPaymentsCount(0);
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

  const denseHeight = table.dense ? 56 : 76;

  const notFound = isError;

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.payments.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.payments.details(id));
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
              name: 'Payments',
              href: paths.dashboard.payments.root,
            },
            { name: 'List' },
          ]}
        />
        <Button
          component={RouterLink}
          href={paths.dashboard.payments.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          New Payment
        </Button>
      </Box>

      <Card>
        {/* <Tabs
            value={filters.status}
            // onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'completed' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'cancelled' && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && _orders.length}
                    {tab.value === 'completed' &&
                      _orders.filter((order) => order.status === 'completed').length}

                    {tab.value === 'pending' &&
                      _orders.filter((order) => order.status === 'pending').length}
                    {tab.value === 'cancelled' &&
                      _orders.filter((order) => order.status === 'cancelled').length}
                    {tab.value === 'refunded' &&
                      _orders.filter((order) => order.status === 'refunded').length}
                  </Label>
                }
              />
            ))}
          </Tabs> */}

        <PaymentsTableToolbar filters={filters} setFilters={setFilters} />

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
              />

              <TableBody>
                {isLoading ? (
                  [...Array(table.rowsPerPage)].map((_, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                ) : (
                  <>
                    {tableData.map((row, index) => (
                      <PaymentsTableRow
                        key={row.id}
                        row={{ ...row, serial_no: index + 1 }}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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

        <TablePaginationCustom
          component="div"
          onPageChange={handlePageChange}
          page={filters.offset}
          count={paymentsCount}
          rowsPerPage={filters.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------
