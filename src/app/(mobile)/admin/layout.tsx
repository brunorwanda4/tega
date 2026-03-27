import AdminNavigation from "./_components/admin-navigation";

const AdminLayout = (propt: LayoutProps<"/app">) => {
  return (
    <div>
      <main className="max-w-md mx-auto  pb-20 bg-base-100  px-6">
        {propt.children}
      </main>
      <AdminNavigation />
    </div>
  );
};

export default AdminLayout;
