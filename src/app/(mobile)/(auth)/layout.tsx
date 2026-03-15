const AuthLayout = (props: LayoutProps<"/">) => {
  return <main className=" min-h-screen py-10">{props.children}</main>;
};

export default AuthLayout;
