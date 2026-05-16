// app/login/page.tsx

import { LoginForm } from "@/features/auth/components/login-form";
import { AuthLayout } from "@/features/auth/components/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
