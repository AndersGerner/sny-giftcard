"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGiftCards } from "@/hooks/use-gift-cards";
import { useToast } from "@/components/ui/use-toast";
import { Store } from "@/lib/api/types";
import { Gift, Loader2 } from "lucide-react";

interface PurchaseDialogProps {
  store: Store;
  onSuccess?: () => void;
}

const AMOUNTS = [25, 50, 100, 200];

export function PurchaseDialog({ store, onSuccess }: PurchaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const { purchase, isLoading } = useGiftCards();
  const { toast } = useToast();

  const handlePurchase = async () => {
    try {
      const finalAmount = customAmount ? parseFloat(customAmount) : amount;
      await purchase(store.id, finalAmount);
      
      toast({
        title: "Success!",
        description: "Your gift card has been purchased successfully.",
      });
      
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase gift card. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Gift className="mr-2 h-4 w-4" />
          Purchase Gift Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Gift Card for {store.name}</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}