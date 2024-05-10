import { createTheme, Direction, ThemeOptions } from '@mui/material/styles';

import breakpoints from './breakpoints';
import SystemColors from './systemColors';
import { TypographyMapping, typography } from './typography';

const direction: Direction = 'ltr';

const themeOptions: ThemeOptions = {
  breakpoints,
  shape: { borderRadius: 8 },
  direction,
  typography,
};

let theme = createTheme(themeOptions);
theme = createTheme(theme, SystemColors(theme));
theme.components = {
  ...TypographyMapping,
};
export { theme };
