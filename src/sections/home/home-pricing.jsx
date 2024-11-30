import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import { _pricingPlans } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomePricing() {
  const mdUp = useResponsive('up', 'md');

  const [currentTab, setCurrentTab] = useState('Standard');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          pricing plans
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">
          The right plan for <br /> your business
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <>
      {mdUp ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{
            borderRadius: 2,
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {_pricingPlans.map((plan) => (
            <m.div key={plan.subscription} variants={varFade().in}>
              <PlanCard key={plan.subscription} plan={plan} />
            </m.div>
          ))}
        </Box>
      ) : (
        <>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {_pricingPlans.map((tab) => (
                <Tab key={tab.key} value={tab.subscription} label={tab.subscription} />
              ))}
            </Tabs>
          </Stack>

          <Box
            sx={{
              borderRadius: 2,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {_pricingPlans.map(
              (plan) =>
                plan.subscription === currentTab && (
                  <PlanCard
                    key={plan.subscription}
                    plan={plan}
                    sx={{
                      borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                  />
                )
            )}
          </Box>
        </>
      )}

      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h4">Still have questions?</Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
              Please describe your case to receive the most accurate advice.
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button
              color="inherit"
              size="large"
              variant="contained"
              href="mailto:support@minimals.cc?subject=[Feedback] from Customer"
            >
              Contact us
            </Button>
          </m.div>
        </Box>
      </m.div>
    </>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {renderContent}
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PlanCard({ plan, sx, ...other }) {
  const { subscription, price, description, features } = plan;

  const standardLicense = subscription === 'Standard';

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(standardLicense && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">{subscription}</Typography>
            <Typography style={{ marginTop: '5px' }}>{price}</Typography>
          </Stack>
          <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
        </Box>
      </Stack>

      {/* {standardLicense ? (
        <Box component="img" alt={icons[1]} src={icons[1]} sx={{ width: 20, height: 20 }} />
      ) : (
        // <Stack direction="row" spacing={2}>
        //   {icons.map((icon) => (
        //     <Box component="img" key={icon} alt={icon} src={icon} sx={{ width: 20, height: 20 }} />
        //   ))}
        // </Stack>
      )} */}

      <Stack spacing={2.5}>
        {features.map((option) =>
          option.is_active ? (
            <Stack key={option.key} spacing={1} direction="row" alignItems="center">
              <Iconify icon="eva:checkmark-fill" width={16} />
              <Typography variant="body2">{option.title}</Typography>
            </Stack>
          ) : null
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {features.map((option) =>
          !option.is_active ? (
            <Stack
              key={option.key}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(!option.is_active && { color: 'text.disabled' }),
              }}
            >
              <Iconify
                icon={!option.is_active ? 'mingcute:close-line' : 'eva:checkmark-fill'}
                width={16}
              />
              <Typography variant="body2">{option.title}</Typography>
            </Stack>
          ) : null
        )}
      </Stack>

      {/* <Stack alignItems="flex-end">
        <Button
          color="inherit"
          size="small"
          target="_blank"
          rel="noopener"
          href={paths.home}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Learn more
        </Button>
      </Stack> */}
    </Stack>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object,
  sx: PropTypes.object,
};
