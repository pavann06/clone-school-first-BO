// import { m, useScroll } from 'framer-motion';
// import { useRef, useState, useEffect, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import { alpha, styled } from '@mui/material/styles';

// import { HEADER } from 'src/layouts/config-layout';
// import { bgGradient, textGradient } from 'src/theme/css';

// import { varFade, MotionContainer } from 'src/components/animate';

// // ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   ...bgGradient({
//     color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
//     imgUrl: '/assets/background/overlay_3.jpg',
//   }),
//   width: '100%',
//   height: '100vh',
//   position: 'relative',
//   [theme.breakpoints.up('md')]: {
//     top: 0,
//     left: 0,
//     position: 'fixed',
//   },
// }));

// const StyledWrapper = styled('div')(({ theme }) => ({
//   height: '100%',
//   overflow: 'hidden',
//   position: 'relative',
//   [theme.breakpoints.up('md')]: {
//     marginTop: HEADER.H_DESKTOP_OFFSET,
//   },
// }));

// const StyledTextGradient = styled(m.h1)(({ theme }) => ({
//   ...textGradient(
//     `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
//   ),
//   padding: 0,
//   marginTop: 8,
//   lineHeight: 1,
//   fontWeight: 900,
//   marginBottom: 24,
//   letterSpacing: 8,
//   textAlign: 'center',
//   backgroundSize: '400%',
//   fontSize: `${64 / 16}rem`,
//   fontFamily: theme.typography.fontSecondaryFamily,
//   [theme.breakpoints.up('md')]: {
//     fontSize: `${96 / 16}rem`,
//   },
// }));

// // ----------------------------------------------------------------------

// export default function HomeHero() {
//   const heroRef = useRef(null);

//   const { scrollY } = useScroll();

//   const [percent, setPercent] = useState(0);

//   const getScroll = useCallback(() => {
//     let heroHeight = 0;

//     if (heroRef.current) {
//       heroHeight = heroRef.current.offsetHeight;
//     }

//     scrollY.on('change', (scrollHeight) => {
//       const scrollPercent = (scrollHeight * 100) / heroHeight;

//       setPercent(Math.floor(scrollPercent));
//     });
//   }, [scrollY]);

//   useEffect(() => {
//     getScroll();
//   }, [getScroll]);

//   const opacity = 1 - percent / 100;

//   const hide = percent > 120;

//   const renderDescription = (
//     <Stack
//       alignItems="center"
//       justifyContent="center"
//       sx={{
//         height: 1,
//         width: '100vw', 
//         mx: 'auto',
//         maxWidth: 980,
//         opacity: opacity > 0 ? opacity : 0,
//         mt: {
//           md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
//         },
//       }}
//     >
//       <m.div variants={varFade().in}>
//         <Typography
//           variant="h2"
//           sx={{
//             textAlign: 'center',
//           }}
//         >
//         WELCOME TO FAMILI FIRST
        

//         </Typography>
//         <p>This admin panel is proprietary property of Famili First and is strictly for the use of authorized internal staff and administrators only. If you have accessed this link without authorization, please email us at familifirst.team@gmail.com immediately to explain how you obtained it. Unauthorized access is prohibited, and you are explicitly barred from attempting to proceed further. Any unauthorized attempts will be logged and may result in legal action.</p>
//       </m.div>

//       <m.div variants={varFade().in}>
//         <StyledTextGradient
//           animate={{ backgroundPosition: '300% center' }}
//           transition={{
//             repeatType: 'reverse',
//             ease: 'linear',
//             duration: 20,
//             repeat: Infinity,
//           }}
//         >
//           FamiliFirst
//         </StyledTextGradient>
//       </m.div>

//       <m.div variants={varFade().in}>
//         <Typography variant="body2" sx={{ textAlign: 'center' }}>
//           {/* The starting point for your next project is based on MUI.Easy customization Helps you
//           build apps faster and better. */}
//         </Typography>
//       </m.div>
//     </Stack>
//   );

//   return (
//     <>
//       <StyledRoot
//         ref={heroRef}
//         sx={{
//           ...(hide && {
//             opacity: 0,
//           }),
//         }}
//       >
//         <StyledWrapper>
//           <Container component={MotionContainer} sx={{ height: 1 }}>
//             <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
//               <Grid xs={12} md={6}>
//                 {renderDescription}
//               </Grid>
//             </Grid>
//           </Container>
//         </StyledWrapper>
//       </StyledRoot>

//       <Box sx={{ height: { md: '100vh' } }} />
//     </>
//   );
// }




import { Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const StyledLogoContainer = styled(Stack)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}));

const StyledDescriptionBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  maxWidth: 600,
  marginTop: theme.spacing(3),
  textAlign: 'center',
}));

export default function HomeHero() {
  return (
    <StyledContainer>
      {/* Welcome Text */}
      <Box
        sx={{
          width: '100%', // Full width or adjust to your requirement
          maxWidth: 900, // Set a consistent maximum width
          mx: 'auto', // Center the content horizontally
          textAlign: 'center', // Optional: Center-align the text
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mt: 3,
            fontWeight: 'semi-bold',
            color: "#076839",
            fontSize: {
              xs: '36px', // Smaller font size for mobile
              sm: '48px', // Medium font size for tablets
              md: '62px', // Larger font size for desktop
            },
          }}
        >
          WELCOME TO FAMILI FIRST
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mt: 3,
            fontWeight: 'regular',
            color: "#076839",
            fontSize: {
              xs: '14px', // Smaller font size for mobile
              sm: '16px', // Medium font size for tablets
              md: '22px', // Larger font size for desktop
            },
            px: {
              xs: 2, // Padding for mobile
              sm: 3, // Padding for tablets
            },
          }}
        >
          This admin panel is proprietary property of Famili First and is
          strictly for the use of authorized internal staff and administrators
          only. If you have accessed this link without authorization, please
          email us at familifirst.team@gmail.com immediately to explain how you
          obtained it. Unauthorized access is prohibited, and you are explicitly
          barred from attempting to proceed further. Any unauthorized attempts
          will be logged and may result in legal action.
        </Typography>
      </Box>
    </StyledContainer>
  );
}
