import * as Cache from "@emotion/cache";
import { EmotionCache } from "@emotion/cache";
import { StyleSheet } from "@emotion/sheet";
import { render } from "@testing-library/react";

import { spyUseServerInsertedHTML } from "@/testUtils/navigation";
import ThemeRegistry, { ThemeRegistryProps } from "./ThemeRegistry";

describe("ThemeRegistry", () => {
  let mockEmotionCache: EmotionCache;
  let props: ThemeRegistryProps;

  beforeEach(() => {
    props = {
      inserted: ["style_1"],
      children: <div data-testid="children" />,
    };

    mockEmotionCache = {
      insert: jest.fn(),
      inserted: { style_1: "style_1" },
      key: "test",
      sheet: new StyleSheet({ key: "test" } as any),
    } as any;

    spyUseServerInsertedHTML().mockImplementation((callback) => {
      const styles = callback();
      props.children = [styles, props.children];
      return styles;
    });

    jest.spyOn(Cache, "default").mockImplementation(() => mockEmotionCache);
  });

  const queryAllStyle = (element: HTMLElement) => {
    // eslint-disable-next-line testing-library/no-node-access
    return element.querySelectorAll("style");
  };

  const renderThemeRegistry = () => {
    const view = render(<ThemeRegistry {...props} />);
    view.rerender(<ThemeRegistry {...props} />);
    return view;
  };

  it("should render correctly", () => {
    const { asFragment } = renderThemeRegistry();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not applied style when insertedList is empty", () => {
    props.inserted = undefined;
    const { baseElement } = renderThemeRegistry();
    expect(queryAllStyle(baseElement)).toHaveLength(0);
  });
});
