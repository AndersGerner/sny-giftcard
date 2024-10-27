import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <WifiOff className="h-12 w-12 mx-auto text-muted-foreground" />
        <h1 className="text-2xl font-bold">You're Offline</h1>
        <p className="text-muted-foreground max-w-md">
          Please check your internet connection and try again.
        </p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}