"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CreditCard } from "lucide-react";

interface RedemptionFormProps {
  card: {
    id: string;
    balance: number;
    code: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export function RedemptionForm({ card, onSuccess, onCancel }: RedemptionFormProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const redemptionAmount = parseFloat(amount);

    if (redemptionAmount > card.balance) {
      toast({
        title: "Invalid Amount",
        description: "Redemption amount cannot exceed available balance",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: `Redeemed $${redemptionAmount.toFixed(2)} from gift card`,
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process redemption",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="neu-card p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Redeem Gift Card</h3>
        <p className="text-sm text-muted-foreground">
          Card Balance: ${card.balance.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Redemption Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              max={card.balance}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading || !amount || parseFloat(amount) > card.balance}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Redeem
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}