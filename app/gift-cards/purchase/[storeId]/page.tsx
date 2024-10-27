"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGiftCards } from "@/hooks/use-gift-cards";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const AMOUNTS = [25, 50, 100, 200];

export default function PurchasePage() {
  const { storeId } = useParams();
  const router = useRouter();
  const { purchase, isLoading } = useGiftCards();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase a gift card",
        variant: "destructive",
      });
      return;
    }

    try {
      const finalAmount = customAmount ? parseFloat(customAmount) : amount;
      const giftCard = await purchase(storeId as string, finalAmount);
      
      if (giftCard) {
        toast({
          title: "Success!",
          description: "Your gift card has been purchased successfully.",
        });
        router.push("/account/gift-cards");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase gift card. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-center">Purchase Gift Card</h1>
          <p className="text-muted-foreground text-center">
            Choose an amount or enter a custom value
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {AMOUNTS.map((value) => (
                <Button
                  key={value}
                  variant={amount === value ? "default" : "outline"}
                  onClick={() => {
                    setAmount(value);
                    setCustomAmount("");
                  }}
                >
                  ${value}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customAmount">Custom Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="customAmount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  className="pl-7"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(0);
                  }}
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handlePurchase}
              disabled={isLoading || (!amount && !customAmount)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Purchase Gift Card ${amount || customAmount ? `($${amount || customAmount})` : ""}`
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}