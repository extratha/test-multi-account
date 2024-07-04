import { Page } from "@/components/Page";
import TermsAndConsModules from "@/modules/TermsAndConditions";
import { useTranslations } from "next-intl";

const TermsAndConsPage = () => {
  const t = useTranslations("Common");
  return (
    <Page title={t("pages.termsAndConditions")}>
      <TermsAndConsModules />
    </Page>
  );
};

export default TermsAndConsPage;
