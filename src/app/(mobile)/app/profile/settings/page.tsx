import { Bell, Globe2, Moon } from "lucide-react";
import AppGoBackButton from "../../_components/common/go-back-button";

const settings = [
  {
    id: "notifications",
    title: "Push notifications",
    detail: "Booking, route, and payment updates",
    icon: Bell,
    value: "On",
  },
  {
    id: "language",
    title: "Language",
    detail: "App display language",
    icon: Globe2,
    value: "English",
  },
  {
    id: "appearance",
    title: "Appearance",
    detail: "Use system theme",
    icon: Moon,
    value: "System",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8 pt-4">
      <header className="flex items-center gap-4">
        <AppGoBackButton />
        <div>
          <h1 className="text-[28px] font-bold text-[#1F1F24] leading-tight">
            Settings
          </h1>
          <p className="text-[16px] text-[#828282] mt-[8px]">
            Customize your app preferences
          </p>
        </div>
      </header>

      <section className="space-y-3">
        {settings.map((setting) => (
          <article
            key={setting.id}
            className="flex items-center justify-between gap-4 rounded-[16px] border border-gray-100 bg-white p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#F3F4F6]">
                <setting.icon className="size-5 text-[#1F1F24]" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#1F1F24]">
                  {setting.title}
                </p>
                <p className="text-[13px] text-[#828282]">{setting.detail}</p>
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-bold text-[#1F1F24]">
              {setting.value}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}
