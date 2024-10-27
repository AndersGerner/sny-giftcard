"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { ROICalculator } from "@/components/business/roi-calculator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";

export default function ROIPage() {
  return (
    <AuthGuard requireAuth requireBusiness>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">ROI Analysis</h1>
              <p className="text-muted-foreground mt-1">
                Calculate and track your gift card program's performance
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="neu-card p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current ROI</p>
                <p className="text-2xl font-bold">24.5%</p>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+2.3% from last month</span>
                </div>
              </div>
            </Card>
            <Card className="neu-card p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Break-even Point</p>
                <p className="text-2xl font-bold">142 cards</p>
                <p className="text-sm text-muted-foreground">
                  Est. 2.5 months to achieve
                </p>
              </div>
            </Card>
            <Card className="neu-card p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Projected Growth</p>
                <p className="text-2xl font-bold">15.3%</p>
                <p className="text-sm text-muted-foreground">
                  Next 3 months forecast
                </p>
              </div>
            </Card>
          </div>

          <ROICalculator />
        </div>
      </div>
    </AuthGuard>
  );
}