declare global {
  // import { TypographyStyleOptions } from "@mui/material/styles";

  declare module "@mui/material" {
    import { CSSProperties } from "react";

    interface TypographyVariantsCustom {
      headerExtraLargeBold: CSSProperties;
      headerSemiBold: CSSProperties;
      headerBold: CSSProperties;
      titleLargeBold: CSSProperties;
      titleSemibold: CSSProperties;
      titleBold: CSSProperties;
      bodyMedium: CSSProperties;
      bodyBold: CSSProperties;
      bodySmall: CSSProperties;
      bodySmallMedium: CSSProperties;
      labelExtraSmall: CSSProperties;
      labelExtraSmallMedium: CSSProperties;
      labelExtraSmallBold: CSSProperties;
    }

    interface TypographyPropsVariantOverrides extends Record<keyof TypographyVariantsCustom, true> {
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

    interface TypographyVariants extends TypographyVariantsCustom {
      //
    }

    interface TypographyVariantsOptions extends Partial<TypographyVariantsCustom> {
      //
    }

    export interface SurfaceGray {
      lowest: string;
    }

    export interface TypeText {
      disabled: string;
      medium: string;
      hight: string;
      success: string;
    }

    export interface Palette {
      surfaceGray: SurfaceGray;
      blueGrey: Color;
      amber: Color;
      text: TypeText;
    }

    export interface PaletteOptions {
      surfaceGray?: SurfaceGray;
      blueGrey?: Partial<Color>;
      amber?: Partial<Color>;
      text?: TextPalette;
    }

    export interface CommonColors {
      transparent: string;
    }

    export interface TypeBackground {
      grayLight: string;
      border: string;
      borderLight: string;
      gradient: string;
    }
  }
}

declare module "*.svg" {
  import { FunctionComponent, SVGProps } from "react";
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}
