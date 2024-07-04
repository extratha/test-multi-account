import UnauthorizedLayout from "@/layout/UnauthorizedLayout";
import ForgetPasswordForm from "./ForgetPasswordForm";

const ForgetPasswordModule = () => {
  return (
    <UnauthorizedLayout>
      <ForgetPasswordForm></ForgetPasswordForm>
    </UnauthorizedLayout>
  );
};

export default ForgetPasswordModule;
