import Image from "next/image";

const AuthProvide = () => {
  const provides = [
    {
      icon: "/icons/apple-logo.png",
      name: "Apple",
    },
    {
      icon: "/icons/google.png",
      name: "Google",
    },
    {
      icon: "/icons/facebook.png",
      name: "Facebook",
    },
  ];
  return (
    <ul className=" flex flex-wrap gap-4">
      {provides.map((provide) => (
        <li
          className=" border-[1.5px] border-neutral/50 rounded-full p-3"
          key={provide.name}
        >
          <Image src={provide.icon} alt={provide.name} width={26} height={26} />
          <span className=" sr-only">{provide.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default AuthProvide;
