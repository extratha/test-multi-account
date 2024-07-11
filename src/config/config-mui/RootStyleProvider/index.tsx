import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "../../config-mui/theme/palette";
import { useServerInsertedHTML } from "next/navigation";
import React, { useMemo, useState } from "react";
import { theme } from "../theme";
import { ColorModeContext } from "./ColorModeContext";

export default function RootStyleProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const muiCache = createCache({ key: "mui-style" });
    muiCache.compat = true;
    return muiCache;
  });

  const [mode, setMode] = useState<PaletteMode>("light");

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          return prevMode === "light" ? "dark" : "light";
        });
      },
      currentMode: mode,
    }),
    [mode]
  );

  const themeWithMode = useMemo(() => {
    return createTheme(theme, getDesignTokens(mode));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={themeWithMode}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}
