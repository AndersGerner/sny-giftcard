"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/business/date-range-picker";
import { MetricsGrid } from "@/components/business/metrics-grid";
import { SalesChart } from "@/components/business/sales-chart";
import { TransactionsTable } from "@/components/business/transactions-table";
import { GiftCardsList } from "@/components/business/gift-cards-list";
import { useBusiness } from "@/hooks/use-business";
import { 
  BarChart3, 
  CreditCard, 
  Download,
  Filter,
} from "lucide-react";

export default function BusinessDashboard() {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date()
  ]);
  const { isLoading } = useBusiness();

  return (
    <AuthGuard requireAuth requireBusiness>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Business Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage your gift card operations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
              />
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <MetricsGrid dateRange={dateRange} />

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="neu-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Sales Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    Gift card sales performance
                  </p>
                </div>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <SalesChart dateRange={dateRange} />
            </Card>

            <Card className="neu-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Active Gift Cards</h3>
                  <p className="text-sm text-muted-foreground">
                    Currently active cards
                  </p>
                </div>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <GiftCardsList />
            </Card>
          </div>

          <Card className="neu-card">
            <Tabs defaultValue="transactions" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <TabsContent value="transactions" className="mt-0">
                <TransactionsTable dateRange={dateRange} />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Additional analytics components will go here */}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}