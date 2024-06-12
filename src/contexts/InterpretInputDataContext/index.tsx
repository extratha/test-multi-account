import { FC, ReactNode, createContext, useState } from "react";

interface Range {
  value: string;
  description: string;
}

interface InterpretDataField {
  key: string;
  value: string;
  unit: string;
  required: boolean;
  fieldType: string;
  minLength: string;
  maxLength: string;
  range: Range[];
}

interface InterpretInputDataContextProps {
  interpretDataFields: InterpretDataField[];
  setInterpretDataFields: (data: InterpretDataField[]) => void;
}

const InterpretInputDataContext = createContext<InterpretInputDataContextProps | undefined>(undefined);

type InterpretInputDataProviderProps = {
  children: ReactNode;
};
const InterpretInputDataProvider: FC<InterpretInputDataProviderProps> = ({ children }) => {
  const [interpretDataFields, setInterpretDataFields] = useState<InterpretDataField[]>([]);

  return (
    <InterpretInputDataContext.Provider value={{ interpretDataFields, setInterpretDataFields }}>
      {children}
    </InterpretInputDataContext.Provider>
  );
};

export { InterpretInputDataContext, InterpretInputDataProvider };
