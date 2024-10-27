import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function BalancePage() {
  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-center">Check Gift Card Balance</h1>
          <p className="text-muted-foreground text-center">
            Enter your gift card details below
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </label>
              <Input
                id="cardNumber"
                placeholder="Enter 16-digit card number"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="pin" className="text-sm font-medium">
                PIN
              </label>
              <Input
                id="pin"
                placeholder="Enter PIN"
                type="password"
                maxLength={4}
              />
            </div>

            <Button className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Check Balance
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}