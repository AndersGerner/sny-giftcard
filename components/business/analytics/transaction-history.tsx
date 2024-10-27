"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  type: "sale" | "redemption" | "refund";
  amount: number;
  cardNumber: string;
  location: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-03-20T10:30:00Z",
    type: "sale",
    amount: 50.00,
    cardNumber: "GH-1234-5678",
    location: "Store #123",
    status: "completed"
  },
  {
    id: "2",
    date: "2024-03-20T11:15:00Z",
    type: "redemption",
    amount: 25.00,
    cardNumber: "GH-2345-6789",
    location: "Online",
    status: "completed"
  },
  {
    id: "3",
    date: "2024-03-20T12:00:00Z",
    type: "refund",
    amount: 50.00,
    cardNumber: "GH-3456-7890",
    location: "Store #456",
    status: "pending"
  }
];

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState(mockTransactions);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-blue-600 dark:text-blue-400";
      case "redemption":
        return "text-green-600 dark:text-green-400";
      case "refund":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <Card className="neu-card">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[250px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Card Number</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={cn("font-medium", getTypeColor(transaction.type))}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-mono">{transaction.cardNumber}</TableCell>
                  <TableCell>{transaction.location}</TableCell>
                  <TableCell>
                    <Badge className={cn("capitalize", getStatusColor(transaction.status))}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}