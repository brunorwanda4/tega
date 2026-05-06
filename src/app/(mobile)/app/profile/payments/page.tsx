import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppGoBackButton from "../../_components/common/go-back-button";

const paymentMethods = [
  {
    id: "momo",
    name: "MTN Mobile Money",
    detail: "+250 788 000 000",
  },
  {
    id: "card",
    name: "Visa card",
    detail: "Ends with 2048",
  },
];

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-8 pt-4">
      <header className="flex items-center gap-4">
        <AppGoBackButton />
        <div>
          <h1 className="text-[28px] font-bold text-[#1F1F24] leading-tight">
            Payment methods
          </h1>
          <p className="text-[16px] text-[#828282] mt-[8px]">
            Manage payment options
          </p>
        </div>
      </header>

      <section className="space-y-3">
        {paymentMethods.map((method) => (
          <article
            key={method.id}
            className="flex items-center gap-4 rounded-[16px] border border-gray-100 bg-white p-4"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-[#F3F4F6]">
              <CreditCard className="size-5 text-[#1F1F24]" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#1F1F24]">
                {method.name}
              </p>
              <p className="text-[13px] text-[#828282]">{method.detail}</p>
            </div>
          </article>
        ))}
      </section>

      <Button size="lg" className="w-full">
        <Plus className="size-5" />
        Add payment method
      </Button>
    </div>
  );
}
