import { Box, Collapse, IconButton, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { IconChevronDown, IconChevronUp, IconConsentGroupDetail } from "@/assets";
import { CUSTOM_COLORS, NEUTRAL } from "@/config/config-mui/theme/colors";
import { ConsentData, ConsentService } from "@/types/termsAndCons";
import { useTranslations } from "next-intl";

export interface ConsentContentProps {
  name: string;
  data: ConsentData;
}

const Markdown = styled(ReactMarkdown)({
  fontSize: "16px",
  whiteSpace: "normal",
  color: CUSTOM_COLORS.textHighEmp,
  "& > *:first-of-type": {
    marginTop: "0px",
  },
  "& > *:last-of-type": {
    marginBottom: "0px",
  },
});

const ContentSection = styled(Stack)({
  padding: "24px",
  borderRadius: "12px",
  background: NEUTRAL[97],
});

const ServiceItem = styled(Stack)(({ theme }) => ({
  border: `1px solid ${NEUTRAL[80]}`,
  backgroundColor: theme.palette.background.paper,
  "&:first-of-type": {
    borderRadius: "12px 12px 0 0",
  },
  "&:last-of-type": {
    borderRadius: "0 0 12px 12px",
  },
}));

const ServiceHeader = styled(Stack)({
  cursor: "pointer",
  flexDirection: "row",
  padding: "24px",
});

const ServiceContent = styled(Stack)({
  padding: "16px",
  borderTop: `1px solid ${NEUTRAL[80]}`,
});

const ServiceLogo = styled("img")({
  maxWidth: "52px",
  maxHeight: "52px",
});

const ArrowUp = styled(IconChevronUp)({
  width: "24px",
  height: "24px",
  color: CUSTOM_COLORS.lightSteelgray,
});

const ArrowDown = styled(IconChevronDown)({
  width: "24px",
  height: "24px",
  color: CUSTOM_COLORS.lightSteelgray,
});

const ConsentContent = (props: ConsentContentProps) => {
  const { name, data } = props;
  const t = useTranslations("Common");

  const [isExpandServices, setIsExpandServices] = useState<boolean[]>([]);

  const handleClickService = (serviceIndex: number) => {
    setIsExpandServices((prevState) => {
      const newState = [...prevState];
      newState[serviceIndex] = !newState[serviceIndex];
      return newState;
    });
  };

  return (
    <Stack spacing={3}>
      <ContentSection>
        <Markdown data-testid={`${name}-content`}>{data.content}</Markdown>
      </ContentSection>
      {data.services.length > 0 && (
        <ContentSection data-testid={`${name}-service`}>
          <Typography variant="titleLargeSemiBold" marginBottom="24px" color={CUSTOM_COLORS.textHighEmp}>
            {t("title.allServices")}
          </Typography>
          {data.services.map((service: ConsentService, index: number) => (
            <ServiceItem key={index}>
              <ServiceHeader data-testid={`${name}-service-${index}`} onClick={() => handleClickService(index)}>
                <Box>
                  <ServiceLogo src={service.logo} data-testid={`${name}-service-${index}-logo`} alt="" />
                </Box>
                <Stack flex="1" spacing="4px" marginLeft="12px">
                  <Typography
                    variant="titleLargeSemiBold"
                    color={CUSTOM_COLORS.textHighEmp}
                    data-testid={`${name}-service-${index}-title`}
                  >
                    {service.title}
                  </Typography>
                  <IconConsentGroupDetail data-testid={`${name}-service-${index}-detail-icon`} />
                </Stack>
                <Stack justifyContent="center">
                  <IconButton>{isExpandServices[index] === true ? <ArrowUp /> : <ArrowDown />}</IconButton>
                </Stack>
              </ServiceHeader>
              <Collapse in={isExpandServices[index]}>
                <ServiceContent data-testid={`${name}-service-${index}-content`}>
                  <Markdown>{service.content}</Markdown>
                </ServiceContent>
              </Collapse>
            </ServiceItem>
          ))}
        </ContentSection>
      )}
    </Stack>
  );
};

export default ConsentContent;
