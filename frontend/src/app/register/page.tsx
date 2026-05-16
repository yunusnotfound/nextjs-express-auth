import { SignupForm } from "@/features/auth/components/signup-form";
import { AuthLayout } from "@/features/auth/components/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
