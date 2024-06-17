import { Autocomplete } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Option } from ".";

interface AutocompleteCustomStyleProps {
  getOptionLabel: (option: Option) => string;
  onChange: (event: React.ChangeEvent<"object">, data: Option | null) => void;
}

export const AutocompleteCustomStyle = styled(Autocomplete)<AutocompleteCustomStyleProps>(() => ({
  minWidth: "200px",
}));
