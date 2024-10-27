"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGiftCardStore } from "@/lib/store";
import { CreditCard, ExternalLink, Gift, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GiftCardsPage() {
  const cards = useGiftCardStore((state) => state.cards);

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Gift Cards</h1>
            <p className="text-muted-foreground mt-1">Manage your digital gift cards</p>
          </div>
          <Link href="/discover">
            <Button className="neu-button">
              <span className="flex items-center">
                Find Stores
                <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </Link>
        </div>

        {cards.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => {
              const isExpiringSoon = new Date(card.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;
              
              return (
                <Link key={card.id} href={`/gift-cards/${card.id}`}>
                  <Card className="neu-card group">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                            <p className="text-2xl font-bold text-gradient">
                              ${card.balance.toFixed(2)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <p className={cn(
                                "text-sm",
                                isExpiringSoon ? "text-destructive" : "text-muted-foreground"
                              )}>
                                Expires: {new Date(card.expiryDate).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Card #{card.code.slice(-4)}
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -inset-4 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CreditCard className="h-8 w-8 text-primary relative" />
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Button variant="ghost" className="w-full group/btn">
                          <span className="flex items-center text-primary">
                            View Details
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="neu-card p-8 text-center">
            <Gift className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">No Gift Cards Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring stores to purchase your first gift card. You can manage all your digital gift cards in one place.
            </p>
            <Link href="/discover">
              <Button className="neu-button">
                <span className="flex items-center">
                  Discover Stores
                  <ExternalLink className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </Link>
          </Card>
        )}

        {cards.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-4 neu-card">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">${cards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Balance</p>
              </div>
            </Card>
            <Card className="p-4 neu-card">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">{cards.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Active Cards</p>
              </div>
            </Card>
            <Card className="p-4 neu-card">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">
                  {cards.filter(card => new Date(card.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000).length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Expiring Soon</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}</content>