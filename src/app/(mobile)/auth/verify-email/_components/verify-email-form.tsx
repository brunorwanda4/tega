"use client"

import { cn } from "@/lib/utils";
import { OTPInput, REGEXP_ONLY_DIGITS, SlotProps } from "input-otp"
import { useEffect, useState } from "react";
import { RegisterType } from "../../register/_schema/register-schema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const VerifyEmailForm = () => {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
   useEffect(() => {
     const storedData = localStorage.getItem("tega_register_data");

     if (storedData) {
       const parsedData = JSON.parse(storedData) as RegisterType;
       setEmail(parsedData.email);
     }
   }, []);

  const [code, setCode] = useState<string>("");

  const handleChange = (value: string) => {
    setCode(value);
  };

  if (code.length === 4) {
    router.push("/app/bookings");
  }

  return (
    <div className=" flex flex-col items-center mt-4">
      <Label>{email}</Label>
      <div className="my-8">
        <OTPInput
          containerClassName="flex items-center gap-3 has-disabled:opacity-50"
          maxLength={4}
          value={code}
          onChange={handleChange}
          render={({ slots }) => (
            <div className="flex gap-2">
              {slots.map((slot, idx) => (
                <Slot key={String(idx)} {...slot} />
              ))}
            </div>
          )}
        />
      </div>
      <div className=" flex flex-col items-center">
        <span className="text-sm text-muted-foreground">Didn't receive a code?</span>
        <button className="btn btn-link">Resend code</button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-md border border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow]",
        { "z-10 border-ring ring-2 ring-primary": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
