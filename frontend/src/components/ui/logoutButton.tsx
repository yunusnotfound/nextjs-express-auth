"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("logout clicked");

    await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <Button variant="outline" type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}
