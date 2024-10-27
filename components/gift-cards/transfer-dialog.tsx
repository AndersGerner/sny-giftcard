"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader2 } from "lucide-react";
import { transferGiftCard } from "@/lib/api/gift-cards";

interface TransferDialogProps {
  cardId: string;
}

export function TransferDialog({ cardId }: TransferDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTransfer = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      await transferGiftCard(cardId, email);
      toast({
        title: "Success",
        description: `Gift card transferred to ${email}`,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transfer gift card",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="neu-button w-full">
          <span className="flex items-center justify-center">
            <Send className="mr-2 h-4 w-4" />
            Transfer Card
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Gift Card</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button 
            className="w-full"
            onClick={handleTransfer}
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Transfer Gift Card"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}</content>