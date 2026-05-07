"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { primaryProjectContact } from "@/data/contacts";
import AppGoBackButton from "../../_components/common/go-back-button";

const defaultProfile = {
  name: primaryProjectContact.name,
  email: primaryProjectContact.email,
};

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState(defaultProfile.name);
  const [email, setEmail] = useState(defaultProfile.email);

  useEffect(() => {
    const storedData = localStorage.getItem("tega_register_data");

    if (!storedData) return;

    try {
      const parsedData = JSON.parse(storedData) as Partial<
        typeof defaultProfile
      >;
      setName(parsedData.name || defaultProfile.name);
      setEmail(parsedData.email || defaultProfile.email);
    } catch (err) {
      console.warn("Unable to read registration data from localStorage", err);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "tega_register_data",
      JSON.stringify({
        name,
        email,
      }),
    );
    router.push("/app/profile");
  };

  return (
    <div className="space-y-8 pt-4">
      <header className="flex items-center gap-4">
        <AppGoBackButton />
        <div>
          <h1 className="text-[28px] font-bold text-[#1F1F24] leading-tight">
            Edit profile
          </h1>
          <p className="text-[16px] text-[#828282] mt-[8px]">
            Update your account information
          </p>
        </div>
      </header>

      <section className="space-y-5">
        <div>
          <label
            htmlFor="profile-name"
            className="block text-[14px] font-medium text-[#1F1F24] mb-2"
          >
            Full name
          </label>
          <Input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="profile-email"
            className="block text-[14px] font-medium text-[#1F1F24] mb-2"
          >
            Email address
          </label>
          <Input
            id="profile-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </section>

      <div className="space-y-3 pt-4">
        <Button size="lg" className="w-full" onClick={handleSave}>
          Save changes
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
