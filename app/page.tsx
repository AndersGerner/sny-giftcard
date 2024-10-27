import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiftIcon, ArrowRight, Store, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <GiftIcon className="mx-auto h-16 w-16 text-primary mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Gift Card Marketplace
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover and purchase gift cards from your favorite local stores
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/discover">
                <Button size="lg" className="text-lg px-8">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/business">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  For Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <Store className="mx-auto h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Local Stores</h3>
              <p className="text-muted-foreground">
                Support your favorite local businesses by purchasing their gift cards
              </p>
            </div>
            <div className="text-center space-y-4">
              <CreditCard className="mx-auto h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Digital Cards</h3>
              <p className="text-muted-foreground">
                Instantly receive and manage your gift cards digitally
              </p>
            </div>
            <div className="text-center space-y-4">
              <GiftIcon className="mx-auto h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Perfect Gifts</h3>
              <p className="text-muted-foreground">
                Give the gift of choice with customizable gift cards
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}