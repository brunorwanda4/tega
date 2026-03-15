import Link from "next/link";
import AuthLogo from "../_components/auth-logo";
import AuthProvide from "../_components/auth-provide";
import LoginForm from "./_components/login-from";
import RegisterForm from "./_components/register-form";

const RegisterPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-8 ">
      <AuthLogo />
      <div className=" text-center gap-4 flex flex-col">
        <h3 className=" font-semibold text-3xl ">Create Account</h3>
        <p className=" text-neutral text-sm">
          Fill your information below or register <br /> with your social
          accounts
        </p>
      </div>
      <RegisterForm />
      <div className="divider text-neutral text-sm">Or sign in with</div>
      <AuthProvide />
      <Link href={"/auth/login"} className=" text-neutral">
        Already have an account?{" "}
        <span className=" text-base-content link">Sign in</span>
      </Link>
    </div>
  );
};

export default RegisterPage;
