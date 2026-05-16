"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/validations/auth.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "../hooks/use-register";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AUTH_ERROR_TYPE } from "../utils/auth-error";
import { NetworkAlert } from "./network-error-alert";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { loading, apiError, handleRegister } = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FieldGroup>
              {/* <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field> */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="m@example.com"
                />
                {form.formState.errors.email?.message && (
                  <FieldError>{form.formState.errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...form.register("password")}
                    />
                    {form.formState.errors.password?.message && (
                      <FieldError>
                        {form.formState.errors.password.message}
                      </FieldError>
                    )}
                  </Field>
                </Field>
              </Field>
              <Field>
                {apiError?.type === AUTH_ERROR_TYPE.NETWORK && <NetworkAlert />}

                {apiError && apiError.type !== AUTH_ERROR_TYPE.NETWORK && (
                  <Alert variant="destructive">
                    <AlertDescription>{apiError.message}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" disabled={loading}>
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
