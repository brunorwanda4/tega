import Image from "next/image";

const MobileLoadingPage = () => {
  return (
    <section className=" bg-primary grid place-content-center min-h-screen w-full">
      <div className=" flex items-center gap-2">
        <Image
          priority
          src="/dark-logo.svg"
          alt="Tega Logo"
          width={40}
          height={40}
        />
        <h1 className=" font-cal-sans text-4xl">Tega</h1>
      </div>
    </section>
  );
};

export default MobileLoadingPage;
