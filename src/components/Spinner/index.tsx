import { CircularProgress } from "@mui/material";

export type SpinnerProps = {
  show?: boolean;
};
const Spinner = ({ show = true }: SpinnerProps) => {
  return show ? <CircularProgress /> : null;
};

export default Spinner;
