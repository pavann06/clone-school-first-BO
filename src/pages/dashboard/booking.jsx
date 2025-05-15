// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Grid, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
// import request from 'src/api/request';

// const cardData = [
//   { key: 'news_count', label: 'News', color: '#b6b3b2' },
//   { key: 'survey_count', label: 'Surveys', color: '#26a69a' },
//   { key: 'poll_count', label: 'Polls', color: '#00796b' },
//   { key: 'feed_count', label: 'Edutain Feeds', color: '#8e24aa' },
//   { key: 'schools_count', label: 'Schools', color: '#e53935' },
// ];

// export default function OverviewBookingPage() {
//   const [counts, setCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const response = await request.get('backoffice/stats');
//         setCounts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch counts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Dashboard</title>
//       </Helmet>

//       <Typography variant="h3" gutterBottom>Welcome to Dashboard</Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <Grid container spacing={3}>
//           {cardData.map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item.key}>
//               <Card
//                 sx={{
//                   background: 'linear-gradient(45deg, #ffffff, #f2f2f2)',
//                   boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
//                   borderRadius: 0,
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.2)',
//                   },
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 }}
//               >
//                 <CardContent
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     height: '200px',
//                     position: 'relative',
//                   }}
//                 >
//                   <Box sx={{ position: 'absolute', top: '20px', fontWeight: 'bold', fontSize: '20px', color: item.color }}>
//                     <Typography variant="h6">{item.label}</Typography>
//                   </Box>

//                   <Box
//                     sx={{
//                       backgroundColor: '#ffffff',
//                       borderRadius: '50%',
//                       width: '80px',
//                       height: '80px',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                       color: '#333',
//                       fontSize: '30px',
//                       fontWeight: 'bold',
//                       position: 'relative',
//                       zIndex: 1,
//                     }}
//                   >
//                     {counts[item.key] ?? 0}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </>
//   );
// }

//  second    one ---------------------------------------------------------

// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   CircularProgress
// } from '@mui/material';
// import request from 'src/api/request';

// const cardData = [
//   { key: 'news_count', label: 'News', bgColor: '#3498db' },
//   { key: 'survey_count', label: 'Survey', bgColor: '#f1c40f' },
//   { key: 'poll_count', label: 'Polls', bgColor: '#2ecc71' },
//   { key: 'feed_count', label: 'Feeds', bgColor: '#9b59b6' },
//   { key: 'schools_count', label: 'Schools', bgColor: '#e67e22' }
// ];

// export default function OverviewBookingPage() {
//   const [counts, setCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const response = await request.get('backoffice/stats');
//         setCounts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch counts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounts();
//   }, []);

//   const total = cardData.reduce((sum, item) => sum + (counts[item.key] ?? 0), 0);
//   const maxValue = Math.max(...cardData.map((item) => counts[item.key] ?? 0)) || 1;

//   let currentAngle = 0;
//   const radius = 80;
//   const pieSlices = cardData.map((item) => {
//     const value = counts[item.key] ?? 0;
//     const sliceAngle = (value / total) * 360;
//     const startAngle = currentAngle;
//     const endAngle = currentAngle + sliceAngle;
//     currentAngle = endAngle;

//     const largeArcFlag = sliceAngle > 180 ? 1 : 0;

//     const x1 = radius + radius * Math.cos((startAngle * Math.PI) / 180);
//     const y1 = radius + radius * Math.sin((startAngle * Math.PI) / 180);
//     const x2 = radius + radius * Math.cos((endAngle * Math.PI) / 180);
//     const y2 = radius + radius * Math.sin((endAngle * Math.PI) / 180);

//     const d = `
//       M ${radius},${radius}
//       L ${x1},${y1}
//       A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}
//       Z
//     `;

//     return <path key={item.key} d={d} fill={item.bgColor} />;
//   });

//   return (
//     <>
//       <Helmet>
//         <title>Dashboard</title>
//       </Helmet>

//       <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600, color: '#2c3e50' }}>
//         Hi, Welcome back
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             {cardData.map((item) => (
//               <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.key}>
//                 <Card
//                   sx={{
//                     borderRadius: 2,
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     background: `${item.bgColor}22`,
// // semi-transparent background
//                     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)'
//                     }
//                   }}
//                 >
//                   <CardContent sx={{ p: 3, flexGrow: 1 }}>
//                     <Typography
//                       variant="subtitle2"
//                       sx={{
//                         color: item.bgColor,
//                         mb: 1,
//                         fontSize: '0.875rem',
//                         opacity: 0.8,
//                         fontWeight: 500
//                       }}
//                     >
//                       {item.label}
//                     </Typography>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         fontWeight: 700,
//                         mb: 1,
//                         color: item.bgColor
//                       }}
//                     >
//                       {counts[item.key] ?? 0}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Charts */}
//           <Grid container spacing={3}>
//             {/* Pie Chart */}
//             <Grid item xs={12} md={5}>
//               <Card sx={{ p: 5, textAlign: 'center' }}>
//                 <Typography variant="h6" gutterBottom>
//                   Pie Chart View
//                 </Typography>
//                 <svg width="180" height="180" viewBox="0 0 160 160">
//                   {pieSlices}
//                 </svg>
//                 <Box mt={2} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
//                   {cardData.map((item) => (
//                     <Box key={item.key} display="flex" alignItems="center" gap={1}>
//                       <Box sx={{ width: 12, height: 12, background: item.bgColor }} />
//                       <Typography variant="caption">{item.label}</Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               </Card>
//             </Grid>

//             {/* Bar Chart */}

//           </Grid>
//         </>
//       )}
//     </>
//   );
// }

// important ==========================================================



// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import {
//   Grid,
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   CircularProgress,
// } from '@mui/material';
// import request from 'src/api/request';

// // Define the card properties
// const cardData = [
//   { key: 'feed_count', label: 'Edutain Feeds', bgColor: '#9b59b6' },
//   { key: 'news_count', label: 'News', bgColor: '#3498db' },
//   { key: 'survey_count', label: 'Survey', bgColor: '#f1c40f' },
//   { key: 'poll_count', label: 'Polls', bgColor: '#2ecc71' },
 

// ];

// export default function OverviewBookingPage() {
//   const [counts, setCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const response = await request.get('backoffice/stats');
//         setCounts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Dashboard | FamiliFirst</title>
//       </Helmet>

//       <Container maxWidth="xl">
//         <Typography
//           variant="h4"
//           gutterBottom
//           sx={{ fontWeight: 600, color: '#2c3e50', mb: 4 }}
//         >
//           Hi, Welcome back
//         </Typography>

//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             {cardData.map((item) => (
//               <Grid key={item.key} item xs={12} sm={6} md={4} lg={2.4}>
//                 <Card
//                   sx={{
//                     borderRadius: 3,
//                     height: 160,
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     px: 3,
//                     background: `${item.bgColor}15`,
//                     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ color: item.bgColor, fontWeight: 600, mb: 0.5 }}
//                     >
//                       {item.label}
//                     </Typography>
//                     <Typography
//                       variant="h4"
//                       sx={{ color: item.bgColor, fontWeight: 700 }}
//                     >
//                       {counts[item.key] ?? 0}
//                     </Typography>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card, Typography, Box, CircularProgress, TextField } from '@mui/material';

import request from 'src/api/request';


// const cardData = [
//   { key: 'feed_count', label: 'Edutain Feeds', bgColor: '#9b59b6' },
//   { key: 'news_count', label: 'News', bgColor: '#3498db' },
//   { key: 'survey_count', label: 'Survey', bgColor: '#f1c40f' },
//   { key: 'poll_count', label: 'Polls', bgColor: '#2ecc71' },
// ];
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
