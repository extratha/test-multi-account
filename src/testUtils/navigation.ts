import * as NextNavigation from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useServerInsertedHTML: jest.fn(),
}));

export interface SpyUseSearchParams {
  get: jest.Mock;
}

export interface SpyUseRouter {
  replace: jest.Mock;
  push: jest.Mock;
  back: jest.Mock;
}

export const spyUseParams = (params: any = {}) => {
  jest.spyOn(NextNavigation, "useParams").mockReturnValue(params);
  return NextNavigation.useParams as jest.Mock;
};

export const spyUseRouter = (): SpyUseRouter => {
  const replace = jest.fn();
  const push = jest.fn();
  const back = jest.fn();
  jest.spyOn(NextNavigation, "useRouter").mockReturnValue({ replace, push, back } as any);
  return { replace, push, back };
};

export const spyUsePathname = (pathname: string) => {
  jest.spyOn(NextNavigation, "usePathname").mockReturnValue(pathname);
};

export const spyUseSearchParams = (): SpyUseSearchParams => {
  const get = jest.fn();
  jest.spyOn(NextNavigation, "useSearchParams").mockReturnValue({ get } as any);
  return {
    get,
  };
};

export const spyUseServerInsertedHTML = () => {
  return jest.spyOn(NextNavigation, "useServerInsertedHTML");
};
