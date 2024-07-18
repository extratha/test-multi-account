// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MockImage = ({ src, alt, fill, objectFit, ...props }: any) => {
  const url = src?.src || src;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} style={{ objectFit }} {...props} />;
};

jest.mock("next/image", () => MockImage);
