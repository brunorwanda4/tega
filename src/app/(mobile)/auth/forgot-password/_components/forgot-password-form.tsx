"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthLoadingIcon from "../../_components/auth-loading-icon";
import {
  type ForgotPasswordType,
  forgotPasswordSchema,
} from "../_schema/forgot-password-schema";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetRequested = form.formState.isSubmitSuccessful;

  const onSubmit = (data: ForgotPasswordType) => {
    startTransition(() => {
      localStorage.setItem("tega_password_reset_email", data.email);
    });
  };

  if (resetRequested) {
    const email = form.getValues("email");

    return (
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <Alert>
          <AlertTitle>Check your email</AlertTitle>
          <AlertDescription>
            A reset code has been sent to {email}.
          </AlertDescription>
        </Alert>
        <Button asChild size="lg" className="w-full">
          <Link href="/auth/login">Back to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      id="forgot-password-form"
      className="w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor="forgot-password-form-email">
                Email
              </FieldLabel>
              <div className="relative">
                <div className="absolute right-3 top-3">
                  <AiOutlineMail size={20} className="text-neutral" />
                </div>
                <Input
                  {...field}
                  id="forgot-password-form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  disabled={isPending}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting || isPending}
        className="mt-6 w-full cursor-pointer"
        size="lg"
      >
        {form.formState.isSubmitting || isPending ? (
          <AuthLoadingIcon />
        ) : (
          <span>Send reset code</span>
        )}
      </Button>

      <div className="mt-6 flex justify-center">
        <Link href="/auth/login" className="text-neutral">
          Remember password?{" "}
          <span className="link text-base-content">Sign in</span>
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
