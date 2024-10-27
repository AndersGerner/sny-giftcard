"use client";

import { useAuth } from "@/hooks/use-auth";
import { useGiftCardStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Gift, Settings, User } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user } = useAuth();
  const cards = useGiftCardStore((state) => state.cards);

  if (!user) {
    return (
      <div className="container py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-4">
            You need to be signed in to view your account.
          </p>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Gift Cards</h3>
                <p className="text-sm text-muted-foreground">
                  {cards.length} active cards
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          {cards.length > 0 ? (
            <div className="grid gap-4">
              {cards.map((card) => (
                <Card key={card.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Gift className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">${card.amount} Gift Card</p>
                        <p className="text-sm text-muted-foreground">
                          Balance: ${card.balance}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Gift Cards Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start exploring stores to purchase your first gift card
              </p>
              <Link href="/discover">
                <Button>
                  Discover Stores
                  <Gift className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}