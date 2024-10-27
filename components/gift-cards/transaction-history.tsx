"use client";

import { useEffect, useState } from "react";
import { getTransactionHistory } from "@/lib/api/gift-cards";
import { Card } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionHistoryProps {
  cardId: string;
}

export function TransactionHistory({ cardId }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const history = await getTransactionHistory(cardId);
        setTransactions(history);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [cardId]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={cn(
                "p-2 rounded-full",
                transaction.type === "credit" 
                  ? "bg-green-100 text-green-600" 
                  : "bg-red-100 text-red-600"
              )}>
                {transaction.type === "credit" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className={cn(
              "font-medium",
              transaction.type === "credit" ? "text-green-600" : "text-red-600"
            )}>
              {transaction.type === "credit" ? "+" : "-"}
              ${transaction.amount.toFixed(2)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}</content>