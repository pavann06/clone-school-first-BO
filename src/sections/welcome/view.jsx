import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ComingSoonIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function WelcomeView() {

  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center',}}>
      <m.div variants={varBounce().in}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Welcome to FamiliFirst!
            </Typography>
          </m.div>

        <m.div variants={varBounce().in}>
        <Typography  variant="h6" sx={{ color: 'text.secondary' }}>
            The Next Gen ERP Software..
        </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
            <ComingSoonIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>

    </Container>
  );
}
