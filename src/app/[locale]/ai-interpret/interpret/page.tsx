import { Page } from "@/components/Page";
import AiInterpretResult from "@/modules/AiInterpretResult";
import { useTranslations } from "next-intl";

const AiInterpretResultPage = () => {
  const tAi = useTranslations("AiInterpret");
  return <Page title={tAi("pages.aiInterpretResult")}><AiInterpretResult /></Page>;
};

export default AiInterpretResultPage;
