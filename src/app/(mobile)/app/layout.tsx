import AppHeader from "./_components/app-header";
import NavigationBar from "./_components/app-navigation";

const ApplicationLayout = (propt: LayoutProps<"/app">) => {
  return (
    <div>
      <AppHeader />
      <main className="max-w-md mx-auto py-12 pb-20 bg-base-100  px-6">
        {propt.children}
      </main>
      <NavigationBar />
    </div>
  );
};

export default ApplicationLayout;
