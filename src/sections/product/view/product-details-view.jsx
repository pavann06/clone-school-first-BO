import { useQuery } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardMedia, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import request from 'src/api/request';
import { CheckInIllustration, CheckoutIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import BookingWidgetSummary from 'src/sections/overview/booking/booking-widget-summary';

import ProductDetailsToolbar from '../product-details-toolbar';
import BookingAvailable from '../../overview/booking/booking-available';

// ----------------------------------------------------------------------

const SPACING = 3;

export default function ProductDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();
  const { id } = params;

  const { data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => request.get('/products', { product_id: id }),
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <>
      <ProductDetailsToolbar
        backLink={paths.dashboard.product.root}
        editLink={paths.dashboard.product.edit(`${id}`)}
      />
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container spacing={SPACING} disableEqualOverflow>
          <Grid xs={12} md={4}>
            <BookingWidgetSummary
              title="Total Booking"
              total={714000}
              // icon={}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <BookingWidgetSummary title="Sold" total={311000} icon={<CheckInIllustration />} />
          </Grid>

          <Grid xs={12} md={4}>
            <BookingWidgetSummary title="Canceled" total={124000} icon={<CheckoutIllustration />} />
          </Grid>
          <Grid container xs={12}>
            <Grid container xs={12} md={8}>
              <Grid xs={12} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="180"
                    image={data?.info?.[0]?.images?.[0]}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="h6">{data?.info?.[0]?.product_name}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12} md={6}>
                <Card>
                  <CardHeader title="PRODUCT DETAILS" />
                  <CardContent>
                    <Typography gutterBottom>{data?.info?.[0]?.product_name}</Typography>
                    <Typography gutterBottom>{data?.info?.[0]?.product_description}</Typography>
                    <Typography gutterBottom>{data?.info?.[0]?.sku}</Typography>
                    <Typography gutterBottom>{data?.info?.[0]?.quantity_type}</Typography>
                    <Typography gutterBottom>{data?.info?.[0]?.default_price}</Typography>
                    <Typography gutterBottom>{String(data?.info?.[0]?.is_active)}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12}>BookingCheckInWidgets</Grid>

              <Grid xs={12}>BookingStatistics</Grid>
            </Grid>

            <Grid xs={12} md={4}>
              <BookingAvailable
                title="Tours Available"
                chart={{
                  series: [
                    { label: 'Sold out', value: 120 },
                    { label: 'Available', value: 66 },
                  ],
                }}
              />
              BookingCustomerReviews
            </Grid>
          </Grid>

          <Grid xs={12}>BookingDetails</Grid>
        </Grid>
      </Container>
    </>
  );
}
