const MockMarkdown = (props: any) => {
  return <div {...props} />;
};

jest.mock("react-markdown", () => MockMarkdown);
