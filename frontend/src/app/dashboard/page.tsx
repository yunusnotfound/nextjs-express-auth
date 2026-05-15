import { LogoutButton } from "@/components/ui/logoutButton";
import { Label } from "@/components/ui/label";
import Link from "next/link";
export default function MainPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm items-center flex-col gap-6">
        {/* <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a> */}
        <div>
          <Label>Welcome</Label>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
