import { useMemo } from 'react';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import { enUS as enUSAdapter } from 'date-fns/locale';

import CssBaseline from '@mui/material/CssBaseline';
import { enUS as enUSCore } from '@mui/material/locale';
import { enUS as enUSDataGrid } from '@mui/x-data-grid';
import { enUS as enUSDate } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useSettingsContext } from 'src/components/settings';

// system
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
// options
import RTL from './options/right-to-left';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createPresets } from './options/presets';
import { createContrast } from './options/contrast';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const currentLang = {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  };

  const settings = useSettingsContext();

  const presets = createPresets(settings.themeColorPresets);

  const contrast = createContrast(settings.themeContrast, settings.themeMode);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(settings.themeMode),
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows(settings.themeMode),
        ...presets.customShadows,
      },
      direction: settings.themeDirection,
      shadows: shadows(settings.themeMode),
      shape: { borderRadius: 8 },
      typography,
    }),
    [
      settings.themeMode,
      settings.themeDirection,
      presets.palette,
      presets.customShadows,
      contrast.palette,
    ]
  );

  const theme = createTheme(memoizedValue);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme]
  );

  return (
    <MuiThemeProvider theme={themeWithLocale}>
      <RTL themeDirection={settings.themeDirection}>
        <CssBaseline />
        {children}
      </RTL>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
