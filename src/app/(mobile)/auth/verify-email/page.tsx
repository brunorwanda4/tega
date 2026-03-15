import AuthLogo from "../_components/auth-logo";

const VerifyEmail = () => {
  return (
    <div>
      <AuthLogo />
      <div className=" text-center gap-4 flex flex-col">
        <h3 className=" font-semibold text-3xl ">Create Account</h3>
        <p className=" text-neutral text-sm">
          Fill your information below or register <br /> with your social
          accounts
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
