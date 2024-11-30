/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SpeedInsights } from '@vercel/speed-insights/react';

// ----------------------------------------------------------------------

import { Provider } from 'react-redux';

import store from 'src/redux/store';

import Router from 'src/routes/sections';

import ThemeProvider from 'src/theme';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';

const queryClient = new QueryClient();

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <SpeedInsights />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayjs.locale('en-gb')}>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'default', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  <Router />
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </Provider>
  );
}
