import { Box, styled, Typography } from "@mui/material";

export interface TagProps {
  name: string;
  text: string;
}

export const TagValue = styled(Box)(({ theme }) => ({
  padding: "4px 8px",
  borderRadius: "4px",
  backgroundColor: theme.palette.blueGrey[50],
}));

const Tag = (props: TagProps) => {
  return (
    <TagValue>
      <Typography variant="labelExtraSmallBold" data-testid={`${props.name}-tag`}>
        {props.text}
      </Typography>
    </TagValue>
  );
};

export default Tag;
