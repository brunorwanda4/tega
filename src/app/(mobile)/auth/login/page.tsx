import Link from "next/link";
import AuthLogo from "../_components/auth-logo";
import AuthProvide from "../_components/auth-provide";
import LoginForm from "./_components/login-from";

const LoginPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-4 ">
      <AuthLogo />
      <div className=" text-center gap-4 flex flex-col">
        <h3 className=" font-semibold text-3xl mt-6">Sign in</h3>
        <p className=" text-neutral text-sm">
          Hi, Welcome back, you’ve been missed
        </p>
      </div>
      <LoginForm />
      <div className="divider text-neutral text-sm">Or sign in with</div>
      <AuthProvide />
      <Link href={"/register"} className=" text-neutral">
        Don't have an account?{" "}
        <span className=" text-base-content link">Sign up</span>
      </Link>
    </div>
  );
};

export default LoginPage;
