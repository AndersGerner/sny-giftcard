"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { TransactionMetrics } from "@/components/business/analytics/transaction-metrics";
import { TransactionHistory } from "@/components/business/analytics/transaction-history";
import { DateRangePicker } from "@/components/business/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });

  return (
    <AuthGuard requireAuth requireBusiness>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
              <p className="text-muted-foreground mt-1">
                Track your gift card performance and transaction history
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DateRangePicker date={date} onDateChange={setDate} />
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TransactionMetrics />
          <TransactionHistory />
        </div>
      </div>
    </AuthGuard>
  );
}