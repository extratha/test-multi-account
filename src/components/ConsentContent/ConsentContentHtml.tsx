import { styled } from "@mui/material";

export interface ConsentContentHtmlProps {
  name: string;
  html: string;
}

const Html = styled("div")({
  fontSize: "16px",
  lineHeight: "28px",
  "& > h3, & > p": {
    "&:first-of-type": {
      marginTop: "0px",
    },
    "&:last-of-type": {
      marginBottom: "0px",
    },
  },
  "& ul": {
    paddingLeft: "24px",
    listStyleType: "disc",
  },
  "& li": {
    margin: "16px 0px",
  },
  "& ol": {
    listStyleType: "none",
    counterReset: "item",
    padding: "0px",
    "& > li": {
      display: "table-row",
      counterIncrement: "item",
      borderCollapse: "separate",
      borderSpacing: "0px 6px",
      "&:before": {
        display: "table-cell",
        content: `counters(item, ".") ". "`,
        paddingRight: "4px",
        whiteSpace: "nowrap",
      },
    },
    "& > ol, & > ul": {
      paddingLeft: "24px",
      "& > li > ol, & > li > ul": {
        padding: "0px",
      },
    },
  },
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    margin: "16px 0px",
    "& li": {
      margin: "0px",
    },
  },
  "& th": {
    height: "48px",
    textAlign: "center",
    color: "#ffffff",
    border: "1px solid #000000",
    borderRightColor: "#ffffff",
    backgroundColor: "#002060",
    "&:last-child": {
      borderColor: "#000000",
    },
  },
  "& td": {
    border: "1px solid #000000",
    padding: "8px",
    verticalAlign: "top",
  },
});

const ConsentContentHtml = ({ name, html }: ConsentContentHtmlProps) => {
  return (
    <Html
      data-testid={`${name}-content`}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default ConsentContentHtml;