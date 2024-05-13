import { Theme } from '@mui/material';

import {
  ERROR,
  NEUTRAL,
  NEUTRAL_VARIANT,
  PRIMARY,
  SECONDARY,
  SUCCESS,
  TERTIARY,
  WARNING,
} from './colors';

const SystemColors = (theme: Theme) => {
  console.log(theme)
  return {
    mui3: {
      sys:
        theme.palette.mode === 'light'
          ? {
            /* PRIMARY */
            primary: PRIMARY[50],
            onPrimary: PRIMARY[100],
            primaryContainer: PRIMARY[90],
            onPrimaryContainer: PRIMARY[10],
            inversePrimary: PRIMARY[80],
            primaryFixed: PRIMARY[90],
            primaryFixedDim: PRIMARY[80],

            /* SECONDARY */
            secondary: SECONDARY[50],
            onSecondary: SECONDARY[100],
            secondaryContainer: SECONDARY[90],
            onSecondaryContainer: SECONDARY[10],

            /* TERTIARY */
            tertiary: TERTIARY[50],
            onTertiary: TERTIARY[100],
            tertiaryContainer: TERTIARY[90],
            onTertiaryContainer: TERTIARY[10],

            /* WARNING */
            warning: WARNING[50],
            onWarning: WARNING[100],
            warningContainer: WARNING[90],
            OnWarningContainer: WARNING[10],

            /* ERROR */
            error: ERROR[50],
            onError: ERROR[100],
            errorContainer: ERROR[90],
            onErrorContainer: ERROR[10],

            /* SUCCESS */
            success: SUCCESS[50],
            onSuccess: SUCCESS[100],
            successContainer: SUCCESS[90],
            onSuccessContainer: SUCCESS[10],

            /* SURFACE */
            surface: NEUTRAL[98],
            surfaceDim: NEUTRAL[87],
            surfaceBright: NEUTRAL[98],
            surfaceContainerLowest: NEUTRAL[100],
            surfaceContainerLow: NEUTRAL[96],
            surfaceContainer: NEUTRAL[94],
            surfaceContainerHigh: NEUTRAL[92],
            surfaceContainerHighest: NEUTRAL[90],
            surfaceVariant: NEUTRAL_VARIANT[90],

            onSurface: NEUTRAL_VARIANT[10],
            onSurfaceVariant: NEUTRAL_VARIANT[40],
            outline: NEUTRAL_VARIANT[80],
            outlineVariant: NEUTRAL_VARIANT[95],

            scrim: NEUTRAL[0],
            shadow: NEUTRAL[0],

            inverseSurface: NEUTRAL[20],
            inverseOnSurface: NEUTRAL[95],
            background: NEUTRAL[99],
            onBackground: NEUTRAL[90],

            surfaceTint: PRIMARY[80],
          }
          : {
            primary: PRIMARY[80],
            primaryContainer: PRIMARY[30],
            onPrimary: PRIMARY[20],
            onPrimaryContainer: PRIMARY[90],
            inversePrimary: PRIMARY[40],
            secondary: SECONDARY[80],
            secondaryContainer: SECONDARY[40],
            onSecondary: SECONDARY[20],
            onSecondaryContainer: SECONDARY[95],
            tertiary: TERTIARY[80],
            tertiaryContainer: TERTIARY[30],
            onTertiary: TERTIARY[20],
            onTertiaryContainer: TERTIARY[90],
            surface: NEUTRAL[6],
            surfaceDim: NEUTRAL[6],
            surfaceBright: NEUTRAL[24],
            surfaceContainerLowest: NEUTRAL[4],
            surfaceContainerLow: NEUTRAL[10],
            surfaceContainer: NEUTRAL[12],
            surfaceContainerHigh: NEUTRAL[17],
            surfaceContainerHighest: NEUTRAL[22],
            surfaceVariant: NEUTRAL_VARIANT[90],
            onSurface: NEUTRAL_VARIANT[10],
            onSurfaceVariant: NEUTRAL_VARIANT[30],
            inverseSurface: NEUTRAL[95],
            inverseOnSurface: NEUTRAL[20],
            background: NEUTRAL[98],
            onBackground: NEUTRAL[10],
            error: ERROR[50],
            errorContainer: ERROR[90],
            onError: ERROR[100],
            onErrorContainer: ERROR[100],
            outline: NEUTRAL_VARIANT[50],
            outlineVariant: NEUTRAL_VARIANT[80],
            shadow: NEUTRAL[0],
            surfaceTint: PRIMARY[50],
            scrim: NEUTRAL[0],
          },
    },
  }
};

export default SystemColors;
