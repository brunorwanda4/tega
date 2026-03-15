import AuthLogo from "../_components/auth-logo";
import LoginForm from "./_component/login-from";

const LoginPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-4">
      <AuthLogo />
      <div className=" text-center gap-4 flex flex-col">
        <h3 className=" font-semibold text-3xl mt-12">Sign in</h3>
        <p className="text-base text-neutral">
          Hi, Welcome back, you’ve been missed
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
