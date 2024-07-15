import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902

export interface ThemeRegistryProps {
  inserted?: string[];
  children: ReactNode;
}

const initialThemeCache = (insertList?: string[]) => {
  const cache = createCache({ key: "mui" });
  cache.compat = true;
  const prevInsert = cache.insert;
  let inserted = insertList || [];

  cache.insert = (...args) => {
    const serialized = args[1];
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return prevInsert(...args);
  };

  const flush = () => {
    const prevInserted = inserted;
    inserted = [];
    return prevInserted;
  };

  return { cache, flush };
};

const ThemeRegistry = ({ inserted, children }: ThemeRegistryProps) => {
  const [themeCache] = useState(initialThemeCache(inserted));
  const { cache, flush } = themeCache;

  useServerInsertedHTML(() => {
    const insertedList = flush();
    if (insertedList.length === 0) return null;

    let styles = "";

    for (const name of insertedList) {
      styles += cache.inserted[name];
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${insertedList.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default ThemeRegistry;
