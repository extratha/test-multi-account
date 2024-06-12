import { InterpretInputDataContext } from "@/contexts/InterpretInputDataContext";
import { useContext } from "react";

export const useInterpretInputData = () => {
  const context = useContext(InterpretInputDataContext);
  if (!context) {
    throw new Error("useInterpretInputData must be used within a DataProvider");
  }
  return context;
};
