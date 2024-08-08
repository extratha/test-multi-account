import { Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo, useState } from "react";
import Markdown from "react-markdown";

import { IconCopy, IconGlobe } from "@/assets";
import { LANGUAGE } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { AiData } from "@/types/model.api";

export interface AiInterpretAiResultProps {
  name: string;
  title: string;
  data: AiData;
}

const TitleResult = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const AiInterpretAiResult = ({ name, title, data }: AiInterpretAiResultProps) => {
  const { translation } = useTranslation();
  const [language, setLanguage] = useState(LANGUAGE.TH);

  const description = useMemo(() => {
    const text = data.descriptions.find((item) => item.language === language);
    return text?.description || "";
  }, [language]);

  const handleClickTranslate = () => {
    setLanguage(language === LANGUAGE.TH ? LANGUAGE.EN : LANGUAGE.TH);
  };

  const handleClickCopy = (text: string) => {
    navigator.clipboard.writeText(`${data.title}\n${text}`);
  };

  return (
    <Stack spacing="16px">
      <TitleResult data-testid={`${name}-title`}>{title}</TitleResult>
      <Markdown data-testid={`${name}-description`}>{description}</Markdown>
      <Stack direction="row" spacing="16px">
        <Button
          startIcon={<IconCopy />}
          onClick={() => handleClickCopy(description)}
          data-testid={`${name}-button-copy`}
        >
          {translation("AiInterpret.aiInterpretResult.button.copy")}
        </Button>
        {data.descriptions.length > 1 && (
          <Button
            startIcon={<IconGlobe />}
            onClick={handleClickTranslate}
            data-testid={`${name}-change-translate-button`}
          >
            {translation("AiInterpret.aiInterpretResult.button.multiple")}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default AiInterpretAiResult;
