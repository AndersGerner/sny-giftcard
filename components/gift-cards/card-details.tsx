"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GiftCard } from "@/lib/api/types";
import { QRCodeDialog } from "./qr-code-dialog";
import { TransferDialog } from "./transfer-dialog";
import { isExpired, isExpiringSoon } from "@/lib/api/gift-cards";
import { CreditCard, AlertTriangle, Clock } from "lucide-react";

interface CardDetailsProps {
  card: GiftCard;
  onTransfer?: () => void;
}

export function CardDetails({ card, onTransfer }: CardDetailsProps) {
  const expired = isExpired(card.expiryDate);
  const expiringSoon = isExpiringSoon(card.expiryDate);

  return (
    <Card className="neu-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">${card.balance.toFixed(2)}</h2>
          <p className="text-muted-foreground">Available Balance</p>
        </div>
        <CreditCard className="h-8 w-8 text-primary" />
      </div>

      {(expired || expiringSoon) && (
        <div className={`flex items-center gap-2 ${expired ? 'text-destructive' : 'text-yellow-600'} bg-destructive/10 p-3 rounded-lg`}>
          <AlertTriangle className="h-5 w-5" />
          <p className="text-sm">
            {expired ? 'This gift card has expired' : 'This gift card will expire soon'}
          </p>
        </div>
      )}

      <div className="space-y-4">
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
        <QRCodeDialog cardId={card.id} qrCodeUrl={card.qrCode} />
        <TransferDialog cardId={card.id} onSuccess={onTransfer} />
      </div>
    </Card>
  );
}