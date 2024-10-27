"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  RefreshCcw, 
  Send, 
  Clock, 
  ArrowLeft,
  Share2,
  History,
  AlertTriangle
} from "lucide-react";
import { GiftCard } from "@/lib/api/types";
import { checkBalance, transferGiftCard, getTransactionHistory } from "@/lib/api/gift-cards";
import { TransferDialog } from "@/components/gift-cards/transfer-dialog";
import { TransactionHistory } from "@/components/gift-cards/transaction-history";

export default function GiftCardPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [card, setCard] = useState<GiftCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const refreshBalance = async () => {
    setIsLoading(true);
    try {
      const balance = await checkBalance(card?.code || "");
      setCard(prev => prev ? { ...prev, balance } : null);
      toast({
        title: "Balance Updated",
        description: `Current balance: $${balance.toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh balance",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isExpiringSoon = card && new Date(card.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gift Cards
        </Button>

        {card ? (
          <>
            <Card className="neu-card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-gradient">${card.balance.toFixed(2)}</h1>
                  <p className="text-muted-foreground">Available Balance</p>
                </div>
                <CreditCard className="h-12 w-12 text-primary" />
              </div>

              {isExpiringSoon && (
                <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="text-sm">This gift card will expire soon</p>
                </div>
              )}

              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Card Number</p>
                  <p className="font-mono text-muted-foreground">{card.code}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Expiry Date</p>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {new Date(card.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="neu-button w-full" 
                  onClick={refreshBalance} 
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Refresh Balance
                  </span>
                </Button>
                <TransferDialog cardId={card.id} />
              </div>
            </Card>

            <Card className="neu-card p-6">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowTransactions(!showTransactions)}
              >
                <History className="mr-2 h-4 w-4" />
                Transaction History
              </Button>
              {showTransactions && <TransactionHistory cardId={card.id} />}
            </Card>
          </>
        ) : (
          <Card className="neu-card p-6 text-center">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Gift card not found</p>
            <p className="text-muted-foreground mt-2">
              The gift card you're looking for doesn't exist or has been removed.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}</content>