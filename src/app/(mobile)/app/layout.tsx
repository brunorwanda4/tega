import NavigationBar from "./_components/app-navigation";

const ApplicationLayout = (propt: LayoutProps<"/app">) => {
  return (
    <div>
      <main className="max-w-md mx-auto  pb-20 bg-base-100  px-6">
        {propt.children}
      </main>
      <NavigationBar />
    </div>
  );
};

export default ApplicationLayout;
