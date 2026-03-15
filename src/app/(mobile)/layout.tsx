const MobileLayout = (props: LayoutProps<"/">) => {
  return (
    <div className=" min-h-screen font-biryani max-w-xl mx-auto">
      {props.children}
    </div>
  );
};

export default MobileLayout;
