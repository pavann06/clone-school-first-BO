import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { fIndianCurrency } from 'src/utils/format-number';

import request from 'src/api/request';
import {
  SeoIllustration,
  BookingIllustration,
  CheckoutIllustration,
  MotivationIllustration,
  OrderCompleteIllustration,
  UpgradeStorageIllustration,
} from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';

import AnalyticsCurrentVisits from 'src/sections/overview/booking/analytics-current-visits';

import BookingTotalIncomes from '../booking-total-incomes';
import BookingWidgetSummary from '../booking-widget-summary';
// import BookingCheckInWidgets from '../booking-check-in-widgets';

// ----------------------------------------------------------------------

const SPACING = 2;

export default function OverviewBookingView() {
  const settings = useSettingsContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => request.get('/branch/dashboard'),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const analytics = data?.info;

  if (isError) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="PURCHASE"
            total={analytics.total_purchases}
            icon={<OrderCompleteIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="SALES"
            total={analytics.total_sales}
            icon={<UpgradeStorageIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="SALES-RETURN"
            total={analytics.total_returns}
            icon={<CheckoutIllustration />}
            symbol="↓"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="PRODUCTS"
            total={analytics.total_products}
            icon={<SeoIllustration />}
            symbol="N"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="CONTACTS"
            total={analytics.total_contacts}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="CURRENT BALANCE"
            total={
              analytics.credit_sum - analytics.debit_sum === 0
                ? '0'
                : fIndianCurrency(analytics.credit_sum - analytics.debit_sum)
            }
            icon={<MotivationIllustration />}
          />
        </Grid>

        <Grid container xs={12} md={8}>
          <Grid xs={12} md={6}>
            <BookingTotalIncomes
              title="CREDIT"
              total={analytics.credit_sum}
              percent={0.1}
              chart={{
                series: [
                  { x: 2016, y: 111 },
                  { x: 2017, y: 136 },
                  { x: 2018, y: 76 },
                  { x: 2019, y: 108 },
                  { x: 2020, y: 74 },
                  { x: 2021, y: 54 },
                  { x: 2022, y: 57 },
                  { x: 2023, y: 84 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6}>
            <BookingTotalIncomes
              title="DEBIT"
              color="warning"
              icon="eva:diagonal-arrow-right-up-fill"
              percent={-0.1}
              total={analytics.debit_sum}
              chart={{
                series: [
                  { x: 2010, y: 88 },
                  { x: 2011, y: 120 },
                  { x: 2012, y: 156 },
                  { x: 2013, y: 123 },
                  { x: 2014, y: 88 },
                  { x: 2015, y: 166 },
                  { x: 2016, y: 145 },
                  { x: 2017, y: 129 },
                  { x: 2018, y: 145 },
                  { x: 2019, y: 188 },
                  { x: 2020, y: 132 },
                  { x: 2021, y: 146 },
                  { x: 2022, y: 169 },
                  { x: 2023, y: 184 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12}>
            {/* <BookingCheckInWidgets
                chart={{
                  series: [
                    { label: 'Sold', percent: 72, total: 38566 },
                    { label: 'Pending for payment', percent: 64, total: 18472 },
                  ],
                }}
              /> */}
          </Grid>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Statistics"
            chart={{
              series: [
                { label: 'Sales', value: analytics.total_sales },
                { label: 'Purchases', value: analytics.total_purchases },
                { label: 'Payments', value: analytics.total_payments },
                { label: 'Sales Returns', value: analytics.total_returns },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
