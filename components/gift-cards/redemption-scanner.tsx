"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, QrCode, X } from "lucide-react";

interface RedemptionScannerProps {
  onScan: (cardId: string) => void;
  onClose: () => void;
}

export function RedemptionScanner({ onScan, onClose }: RedemptionScannerProps) {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [manualCode, setManualCode] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const qrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    qrcodeScanner.render(
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText);
          if (data.type === "gift-card") {
            onScan(data.id);
            qrcodeScanner.clear();
          }
        } catch (error) {
          toast({
            title: "Invalid QR Code",
            description: "This QR code is not a valid gift card",
            variant: "destructive",
          });
        }
      },
      (error) => {
        console.error("QR Scan error:", error);
      }
    );

    setScanner(qrcodeScanner);

    return () => {
      if (qrcodeScanner) {
        qrcodeScanner.clear();
      }
    };
  }, [onScan, toast]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.length >= 8) {
      onScan(manualCode);
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid gift card code",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="neu-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Scan Gift Card</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div id="qr-reader" className="w-full max-w-sm mx-auto" />

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              or enter code manually
            </span>
          </div>
        </div>

        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <Input
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Enter gift card code"
            className="flex-1"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Card>
  );
}