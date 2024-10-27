"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { redeemGiftCard } from "@/lib/api/gift-cards";
import { CreditCard, Loader2 } from "lucide-react";

interface RedemptionDialogProps {
  cardId: string;
  balance: number;
  onSuccess?: () => void;
}

export function RedemptionDialog({ cardId, balance, onSuccess }: RedemptionDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    const redemptionAmount = parseFloat(amount);

    if (redemptionAmount > balance) {
      toast({
        title: "Error",
        description: "Redemption amount cannot exceed available balance",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await redeemGiftCard({
        giftCardId: cardId,
        amount: redemptionAmount,
        merchantId: "mock-merchant", // Replace with actual merchant ID
      });

      toast({
        title: "Success",
        description: `Redeemed $${redemptionAmount.toFixed(2)} from gift card`,
      });

      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redeem gift card",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Redeem Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem Gift Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleRedeem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Redemption Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                max={balance}
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Available balance: ${balance.toFixed(2)}
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !amount || parseFloat(amount) > balance}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Redeem Gift Card"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}