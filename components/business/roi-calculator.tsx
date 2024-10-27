"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ROIMetrics {
  totalRevenue: number;
  operatingCosts: number;
  netProfit: number;
  roi: number;
  breakEvenPoint: number;
  projectedGrowth: number;
}

export function ROICalculator() {
  const [metrics, setMetrics] = useState<ROIMetrics | null>(null);
  const [formData, setFormData] = useState({
    averageCardValue: 50,
    monthlyVolume: 100,
    redemptionRate: 85,
    marketingCosts: 500,
    operationalCosts: 1000,
  });

  const calculateROI = () => {
    const {
      averageCardValue,
      monthlyVolume,
      redemptionRate,
      marketingCosts,
      operationalCosts,
    } = formData;

    const totalRevenue = averageCardValue * monthlyVolume;
    const totalCosts = marketingCosts + operationalCosts;
    const netProfit = totalRevenue * (1 - redemptionRate / 100) - totalCosts;
    const roi = (netProfit / totalCosts) * 100;
    const breakEvenPoint = totalCosts / (averageCardValue * (1 - redemptionRate / 100));
    const projectedGrowth = netProfit * 1.15; // 15% projected growth

    setMetrics({
      totalRevenue,
      operatingCosts: totalCosts,
      netProfit,
      roi,
      breakEvenPoint,
      projectedGrowth,
    });
  };

  return (
    <Card className="neu-card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">ROI Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Calculate your gift card program's return on investment
            </p>
          </div>
          <Calculator className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="averageCardValue">Average Card Value ($)</Label>
            <Input
              id="averageCardValue"
              type="number"
              value={formData.averageCardValue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  averageCardValue: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyVolume">Monthly Sales Volume</Label>
            <Input
              id="monthlyVolume"
              type="number"
              value={formData.monthlyVolume}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyVolume: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redemptionRate">Redemption Rate (%)</Label>
            <Input
              id="redemptionRate"
              type="number"
              value={formData.redemptionRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  redemptionRate: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketingCosts">Monthly Marketing Costs ($)</Label>
            <Input
              id="marketingCosts"
              type="number"
              value={formData.marketingCosts}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  marketingCosts: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="operationalCosts">Monthly Operational Costs ($)</Label>
            <Input
              id="operationalCosts"
              type="number"
              value={formData.operationalCosts}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  operationalCosts: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="flex items-end">
            <Button onClick={calculateROI} className="w-full">
              Calculate ROI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {metrics && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Monthly Revenue</TableCell>
                <TableCell className="text-right">
                  ${metrics.totalRevenue.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Operating Costs</TableCell>
                <TableCell className="text-right">
                  ${metrics.operatingCosts.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Profit</TableCell>
                <TableCell className="text-right">
                  ${metrics.netProfit.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ROI</TableCell>
                <TableCell className="text-right">
                  {metrics.roi.toFixed(2)}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Break-even Point (cards)</TableCell>
                <TableCell className="text-right">
                  {Math.ceil(metrics.breakEvenPoint)} cards
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Projected Growth (next month)</TableCell>
                <TableCell className="text-right">
                  ${metrics.projectedGrowth.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}