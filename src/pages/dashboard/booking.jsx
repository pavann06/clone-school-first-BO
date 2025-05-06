




import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import request from 'src/api/request';

const cardData = [
  { key: 'news', label: 'News', color: '#b6b3b2' },
  { key: 'surveys', label: 'Surveys', color: '#26a69a' },
  { key: 'polls', label: 'Polls', color: '#00796b' },
  { key: 'feeds', label: 'Edutain Feeds', color: '#8e24aa' },
  { key: 'schools', label: 'Schools', color: '#e53935' },
];

export default function OverviewBookingPage() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await request.get('backoffice/dashboard/counts/');
        setCounts(response.data);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Typography variant="h3" gutterBottom>Welcome to Dashboard</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {cardData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.key}>
              <Card
                sx={{
                  background: 'linear-gradient(45deg, #ffffff, #f2f2f2)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: 0,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'absolute', top: '20px', fontWeight: 'bold', fontSize: '20px', color: item.color }}>
                    <Typography variant="h6">{item.label}</Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      width: '80px',
                      height: '80px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      color: '#333',
                      fontSize: '30px',
                      fontWeight: 'bold',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {counts[item.key] ?? 0}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
