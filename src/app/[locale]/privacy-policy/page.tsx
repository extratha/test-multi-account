import { Page } from "@/components/Page";
import PrivacyPolicyModule from "@/modules/PrivacyPolicy";
import { useTranslations } from "next-intl";

const PrivacyPolicyPage = () => {
    const t = useTranslations("Common");
    return (
        <Page title={t("pages.privacyPolicy")}>
            <PrivacyPolicyModule />
        </Page>
    );
};

export default PrivacyPolicyPage;
