"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type LoginType, loginSchema } from "../_schema/login-schema";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginType) => {
    setError(null);
    setSuccess(null);
  };

  return (
    <form
      id="login-form"
      className="w-full "
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
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
                  name="email"
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
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className=" mt-6 w-full "
      >
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
