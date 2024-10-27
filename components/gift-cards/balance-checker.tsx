"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getGiftCardBalance } from "@/lib/api/gift-cards";
import { CreditCard, Loader2 } from "lucide-react";

export function BalanceChecker() {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const balance = await getGiftCardBalance(cardNumber);
      toast({
        title: "Balance Retrieved",
        description: `Current balance: $${balance.toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid card number or PIN",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="neu-card p-6">
      <form onSubmit={handleCheck} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="Enter 16-digit card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="neu-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pin">PIN</Label>
          <Input
            id="pin"
            type="password"
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="neu-input"
            maxLength={4}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full neu-button" 
          disabled={isLoading || !cardNumber || !pin}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Check Balance
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}