import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthLogoProps {
  className?: string;
}

const AuthLogo = ({ className }: AuthLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/light-logo.svg" alt="Tega Logo" width={30} height={30} />
      <h1 className=" font-cal-sans text-3xl">Tega</h1>
    </div>
  );
};

export default AuthLogo;
