import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppGoBackButton from "../../_components/common/go-back-button";

export default function SecurityPage() {
  return (
    <div className="space-y-8 pt-4">
      <header className="flex items-center gap-4">
        <AppGoBackButton />
        <div>
          <h1 className="text-[28px] font-bold text-[#1F1F24] leading-tight">
            Security
          </h1>
          <p className="text-[16px] text-[#828282] mt-[8px]">
            Protect your Tega account
          </p>
        </div>
      </header>

      <section className="space-y-3">
        <article className="flex items-center justify-between rounded-[16px] border border-gray-100 bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#F3F4F6]">
              <ShieldCheck className="size-5 text-[#1F1F24]" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#1F1F24]">
                Account verified
              </p>
              <p className="text-[13px] text-[#828282]">
                Your profile is currently verified
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[#219653]/10 px-3 py-1 text-[12px] font-bold text-[#219653]">
            Active
          </span>
        </article>

        <article className="flex items-center gap-4 rounded-[16px] border border-gray-100 bg-white p-4">
          <div className="flex size-11 items-center justify-center rounded-full bg-[#F3F4F6]">
            <LockKeyhole className="size-5 text-[#1F1F24]" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              Password security
            </p>
            <p className="text-[13px] text-[#828282]">Last updated recently</p>
          </div>
        </article>
      </section>

      <Button size="lg" className="w-full">
        Change password
      </Button>
    </div>
  );
}
