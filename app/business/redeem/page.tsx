"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Card } from "@/components/ui/card";
import { RedemptionScanner } from "@/components/gift-cards/redemption-scanner";
import { RedemptionForm } from "@/components/gift-cards/redemption-form";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default function RedeemPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleScan = async (cardId: string) => {
    // In a real app, fetch card details from API
    const mockCard = {
      id: cardId,
      balance: 100.00,
      code: "GIFT-1234",
      expiryDate: "2025-12-31"
    };
    setSelectedCard(mockCard);
    setShowScanner(false);
  };

  const handleSuccess = () => {
    setSelectedCard(null);
  };

  return (
    <AuthGuard requireAuth requireBusiness>
      <div className="container py-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Redeem Gift Card</h1>
            <p className="text-muted-foreground">
              Scan or enter a gift card code to process redemption
            </p>
          </div>

          {!showScanner && !selectedCard && (
            <Card className="neu-card p-6">
              <Button
                onClick={() => setShowScanner(true)}
                className="w-full neu-button"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Scan Gift Card
              </Button>
            </Card>
          )}

          {showScanner && (
            <RedemptionScanner
              onScan={handleScan}
              onClose={() => setShowScanner(false)}
            />
          )}

          {selectedCard && (
            <RedemptionForm
              card={selectedCard}
              onSuccess={handleSuccess}
              onCancel={() => setSelectedCard(null)}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}