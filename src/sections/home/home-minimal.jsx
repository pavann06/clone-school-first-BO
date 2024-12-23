import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/ic_make_brand.svg',
    title: 'End-to-End Seed Management',
    description:
      'Our comprehensive seed management solutions help enterprises streamline the entire process, from seed purchase to yield, assuring efficiency and ease of operation throughout.',
  },
  {
    icon: ' /assets/icons/faqs/ic_refund.svg',
    title: 'Automated Financial Management',
    description:
      'Our system enables organizations to automate payments, invoices, and billing procedures, decreasing errors and saving time and money.',
  },
  {
    icon: ' /assets/icons/faqs/ic_assurances.svg',
    title: 'Tax Compliance',
    description:
      'FamiliFirst makes tax compliance easier by automatically calculating and applying taxes to transactions, ensuring that firms comply with tax requirements.',
  },
  {
    icon: ' /assets/icons/navbar/ic_analytics.svg',
    title: 'Real Time Insights',
    description:
      'FamiliFirst gives businesses the ability to track financial performance closely and make rapid adjustments to optimize profitability with real-time data updates and analytics.',
  },
  {
    icon: ' /assets/icons/glass/ic_glass_users.png',
    title: 'Reliable Support',
    description:
      'To help businesses make the most of our features and quickly resolve any problems or queries, we  offer dependable customer assistance.',
  },
  {
    icon: ' /assets/icons/home/ic_development.svg',
    title: 'User Friendly Interface',
    description:
      'Our intuitive interface makes it easy for users to navigate and utilize features effectively, enhancing productivity and user satisfaction.',
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        {/* <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            SeedSoft
          </Typography>
        </m.div> */}

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            What FamiliFirst <br /> helps you in ?
          </Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {CARDS.map((card) => (
          <m.div variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                textAlign: 'center',
                bgcolor: { xs: alpha('#000', 0.02), md: alpha('#000', 0.0) },
                p: (theme) => theme.spacing(10, 5),
                boxShadow: (theme) => ({
                  md: `-40px 40px 80px ${
                    theme.palette.mode === 'light'
                      ? alpha(theme.palette.grey[500], 0.8)
                      : alpha(theme.palette.common.black, 0.8)
                  }`,
                }),
                height: 500,
              }}
            >
              <Box
                component="img"
                src={card.icon}
                alt={card.title}
                sx={{ mx: 'auto', width: 48, height: 48 }}
              />

              <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
