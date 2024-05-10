import { PaletteColor, PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface Palette {
    gradients: GradientsPaletteOptions;
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    gradients: GradientsPaletteOptions;
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material' {
  type Color = {
    0: string;
    25: string;
    1000: string;
    500_4: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  };
}

declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    lightRounded: true;
  }
}

declare module '@mui/material/Chip' {
  export interface ChipPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    displayLargeSemiBold: React.CSSProperties;
    displayLarge: React.CSSProperties;
    displayMediumSemiBold: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displaySmallSemiBold: React.CSSProperties;
    displaySmall: React.CSSProperties;
    headlineLargeSemiBold: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    headlineMediumBold: React.CSSProperties;
    headlineMediumSemiBold: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineSmallSemiBold: React.CSSProperties;
    headlineSmall: React.CSSProperties;
    titleLargeBold: React.CSSProperties;
    titleLargeSemiBold: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleMediumBold: React.CSSProperties;
    titleMediumSemiBold: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleSmallSemiBold: React.CSSProperties;
    titleSmall: React.CSSProperties;
    bodyLargeSemiBold: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyMediumSemiBold: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodySmallSemiBold: React.CSSProperties;
    bodySmall: React.CSSProperties;
    labelExtraLargeSemiBold: React.CSSProperties;
    labelExtraLarge: React.CSSProperties;
    labelLargeBold: React.CSSProperties;
    labelLargeSemiBold: React.CSSProperties;
    labelLarge: React.CSSProperties;
    labelMediumSemiBold: React.CSSProperties;
    labelMedium: React.CSSProperties;
    labelSmallSemiBold: React.CSSProperties;
    labelSmall: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    displayLargeSemiBold?: React.CSSProperties;
    displayLarge?: React.CSSProperties;
    displayMediumSemiBold?: React.CSSProperties;
    displayMedium?: React.CSSProperties;
    displaySmallSemiBold?: React.CSSProperties;
    displaySmall?: React.CSSProperties;
    headlineLargeSemiBold?: React.CSSProperties;
    headlineLarge?: React.CSSProperties;
    headlineMediumBold?: React.CSSProperties;
    headlineMediumSemiBold?: React.CSSProperties;
    headlineMedium?: React.CSSProperties;
    headlineSmallSemiBold?: React.CSSProperties;
    headlineSmall?: React.CSSProperties;
    titleLargeBold?: React.CSSProperties;
    titleLargeSemiBold?: React.CSSProperties;
    titleLarge?: React.CSSProperties;
    titleMediumBold?: React.CSSProperties;
    titleMediumSemiBold?: React.CSSProperties;
    titleMedium?: React.CSSProperties;
    titleSmallSemiBold?: React.CSSProperties;
    titleSmall?: React.CSSProperties;
    bodyLargeSemiBold?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    bodyMediumSemiBold: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
    bodySmallSemiBold?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
    labelExtraLargeSemiBold?: React.CSSProperties;
    labelExtraLarge?: React.CSSProperties;
    labelLargeBold?: React.CSSProperties;
    labelLargeSemiBold?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
    labelMediumSemiBold?: React.CSSProperties;
    labelMedium?: React.CSSProperties;
    labelSmallSemiBold?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayLargeSemiBold: true;
    displayLarge: true;
    displayMediumSemiBold: true;
    displayMedium: true;
    displaySmallSemiBold: true;
    displaySmall: true;
    headlineLargeSemiBold: true;
    headlineLarge: true;
    headlineMediumBold: true;
    headlineMediumSemiBold: true;
    headlineMedium: true;
    headlineSmallSemiBold: true;
    headlineSmall: true;
    titleLargeBold: React.CSSProperties;
    titleLargeSemiBold: true;
    titleLarge: true;
    titleMediumBold: true;
    titleMediumSemiBold: true;
    titleMedium: true;
    titleSmallSemiBold: true;
    titleSmall: true;
    bodyLargeSemiBold: true;
    bodyLarge: true;
    bodyMediumSemiBold: true;
    bodyMedium: true;
    bodySmallSemiBold: true;
    bodySmall: true;
    labelExtraLargeSemiBold: true;
    labelExtraLarge: true;
    labelLargeBold: true;
    labelLargeSemiBold: true;
    labelLarge: true;
    labelMediumSemiBold: true;
    labelMedium: true;
    labelSmallSemiBold: true;
    labelSmall: true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    mui3: {
      sys: {
        /* PRIMARY */
        primary: string;
        onPrimary: string;
        primaryContainer: string;
        onPrimaryContainer: string;
        inversePrimary: string;
        primaryFixed: string;
        primaryFixedDim: string;
        /* SECONDARY */
        secondary: string;
        onSecondary: string;
        secondaryContainer: string;
        onSecondaryContainer: string;
        /* TERTIARY */
        tertiary: string;
        onTertiary: string;
        tertiaryContainer: string;
        onTertiaryContainer: string;
        /* WARNING */
        warning: string;
        onWarning: string;
        warningContainer: string;
        OnWarningContainer: string;
        /* ERROR */
        error: string;
        onError: string;
        errorContainer: string;
        onErrorContainer: string;
        /* Success */
        success: string;
        onSuccess: string;
        successContainer: string;
        onSuccessContainer: string;
        /* SURFACE */
        surface: string;
        surfaceDim: string;
        surfaceBright: string;
        surfaceContainerLowest: string;
        surfaceContainerLow: string;
        surfaceContainer: string;
        surfaceContainerHigh: string;
        surfaceContainerHighest: string;
        surfaceVariant: string;

        onSurface: string;
        onSurfaceVariant: string;
        outline: string;
        outlineVariant: string;

        scrim: string;
        shadow: string;

        inverseSurface: string;
        inverseOnSurface: string;
        background: string;
        onBackground: string;

        surfaceTint: string;
        background: string;
      };
    };
  }
}
