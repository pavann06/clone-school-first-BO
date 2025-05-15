


import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card, Typography, Box, CircularProgress, TextField } from '@mui/material';

import request from 'src/api/request';



const cardData = [
  { key: 'feed_count', label: 'Edutain Feeds', bgColor: '#9b59b6', imageSrc: 'public/logo/ffeds-logo-img.png' },
  { key: 'news_count', label: 'News', bgColor: '#3498db', imageSrc: 'public/logo/news-logo-img.png' },
  { key: 'survey_count', label: 'Survey', bgColor: '#f1c40f', imageSrc: 'public/logo/survey-imga.png' },
  { key: 'poll_count', label: 'Polls', bgColor: '#2ecc71', imageSrc: 'public/logo/polimg.png' },
];

export default function OverviewBookingPage() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(getTodayDate());  
  const [endDate, setEndDate] = useState(getTodayDate());  

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        
        const formattedStartDate = startDate; 
        const formattedEndDate = endDate;  

       
        const queryParams = new URLSearchParams({
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        });

      
        const response = await request.get(`backoffice/stats?${queryParams.toString()}`);

        setCounts(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [startDate, endDate]);  

  
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];  
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | FamiliFirst</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, color: '#2c3e50', mb: 4 }}
        >
          Hi, Welcome back
        </Typography>

        {/* Date Pickers for selecting the range */}
        <Box display="flex"  mb={6}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '38%',mr: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '38%' }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {cardData.map((item) => (
              <Grid key={item.key} item xs={12} sm={6} md={4} lg={2.4}>
              <Card
  sx={{
    borderRadius: 3,
    height: 200,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: `${item.bgColor}15`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
    },
    px: 2,
  }}
>
  <Box
    component="img"
    src={item.imageSrc}
    alt={item.label}
    sx={{ width: 48, height: 48, mb: 1 }}
  />
  <Typography
    variant="subtitle2"
    sx={{ color: item.bgColor, fontWeight: 600, mb: 0.5 }}
  >
    {item.label}
  </Typography>
  <Typography
    variant="h4"
    sx={{ color: item.bgColor, fontWeight: 700 }}
  >
    {counts[item.key] ?? 0}
  </Typography>
</Card>



              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
