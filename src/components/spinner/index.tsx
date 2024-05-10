import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";


export type SpinnerProps = {
  show?: boolean;
  width?: number;
  height?: number;
};
const Spinner = ({ show = true, width = 120, ...rest }: SpinnerProps) => {
  return show ? (
    <CircularProgress/>
  ) : null;
};

export default Spinner;
