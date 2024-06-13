import { styled, Typography, Box } from "@mui/material";

import { NEUTRAL } from "@/config/config-mui/theme/colors";

export interface TagProps {
  name: string;
  text: string;
}

export const TagValue = styled(Box)(() => ({
  padding: "4px 8px",
  background: NEUTRAL[99],
  borderRadius: "4px",
}));

const Tag = (props: TagProps) => {
  return (
    <TagValue>
      <Typography variant="labelLargeSemiBold" data-testid={`${props.name}-tag`}>
        {props.text}
      </Typography>
    </TagValue>
  );
};

export default Tag;
