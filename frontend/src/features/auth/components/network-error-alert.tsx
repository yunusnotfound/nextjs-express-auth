import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function NetworkAlert() {
  return (
    <Alert variant="destructive">
      <Info className="h-4 w-4" />
      <AlertTitle>Network Error</AlertTitle>
      <AlertDescription>
        A network error occurred. Please check your internet connection.
      </AlertDescription>
    </Alert>
  );
}
