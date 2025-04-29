// import { Helmet } from 'react-helmet-async';



// // ----------------------------------------------------------------------

// export default function DashboardListPage() {
//   return (
//     <>
//       <Helmet>
//         <title> List</title>
//       </Helmet>

//       <div>
//         <h1>Hai welcome to dashboard</h1>
//       </div>
//     </>
//   );
// }


import { Helmet } from 'react-helmet-async';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

// ----------------------------------------------------------------------

const sections = ['NEWS', 'FEEDS', 'POLLS', 'SURVEYS'];

export default function DashboardListPage() {
  return (
    <>
      <Helmet>
        <title>List</title>
      </Helmet>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hai, welcome to dashboard
        </Typography>

        <Grid container spacing={4}>
          {sections.map((title) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
