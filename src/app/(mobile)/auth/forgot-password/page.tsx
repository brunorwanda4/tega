import GoBackButton from "@/components/common/go-back-button";
import AuthLogo from "../_components/auth-logo";
import ForgotPasswordForm from "./_components/forgot-password-form";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex w-full justify-start">
        <GoBackButton />
      </div>
      <AuthLogo />
      <div className="flex flex-col gap-4 text-center">
        <h3 className="font-semibold text-3xl">Forgot Password</h3>
        <p className="text-neutral text-sm">
          Enter your email address and we will send
          <br /> you a password reset code.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
