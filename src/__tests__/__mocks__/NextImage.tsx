// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MockImage = ({ src, alt, fill, ...props }: any) => {
  const url = src?.src || src;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} {...props} />;
};
