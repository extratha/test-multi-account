import { Page } from "@/components/Page";
import InputDataModule from "@/modules/InputDataModule";
import { useTranslations } from "next-intl";

const TryInputDataPage = () => {
  const tAi = useTranslations("AiInterpret");
  return (
    <>
      <Page title={tAi("pages.tryInputData")}>{<InputDataModule />}</Page>
    </>
  );
};
export default TryInputDataPage;
