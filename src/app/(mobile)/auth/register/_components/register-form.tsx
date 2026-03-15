"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AuthLoadingIcon from "../../_components/auth-loading-icon";
import { type RegisterType, registerSchema } from "../_schema/register-schema";

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      terms: false,
    },
  });

  const onSubmit = (data: RegisterType) => {
    setError(null);
    setSuccess(null);

    startTransition(() => {
      try {
        localStorage.setItem("tega_register_data", JSON.stringify(data));
      } catch (err) {
        console.warn("Unable to save registration data to localStorage", err);
      }
      router.push("/auth/verify-email");
    });
  };

  return (
    <form
      id="login-form"
      className="w-full "
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className=" w-full">
              <FieldLabel htmlFor="login-form-name">Name</FieldLabel>
              <div className="relative">
                <div className=" absolute right-3 top-3">
                  <AiOutlineUser size={20} className=" text-neutral" />
                </div>
                <Input
                  {...field}
                  id="login-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  disabled={isPending}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className=" w-full">
              <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
              <div className="relative">
                <div className=" absolute right-3 top-3">
                  <AiOutlineMail size={20} className=" text-neutral" />
                </div>
                <Input
                  {...field}
                  id="login-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  disabled={isPending}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-3 top-3"
                  name="password"
                  disabled={isPending}
                >
                  {showPassword ? (
                    <IoEyeOutline size={20} className=" text-neutral" />
                  ) : (
                    <IoEyeOffOutline size={20} className=" text-neutral " />
                  )}
                </button>
                <Input
                  {...field}
                  id="login-form-password"
                  name="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  disabled={isPending}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Controller
        name="terms"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="  ">
            <div className="flex flex-row items-center gap-2 mt-6">
              <Checkbox
                id="register-form-terms"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
                className=" size-4 max-w-4 "
                disabled={isPending}
              />
              <FieldLabel
                htmlFor="register-form-terms"
                className="mb-0 cursor-pointer"
              >
                I agree with{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="link link-primary"
                >
                  Terms & Conditions
                </Link>
              </FieldLabel>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting || isPending}
        className=" mt-6 w-full cursor-pointer"
        size={"lg"}
      >
        {form.formState.isSubmitting || !isPending ? (
          <span>Sign up</span>
        ) : (
          <AuthLoadingIcon />
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
