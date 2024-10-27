"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gift className="h-6 w-6" />
            <span className="font-bold">GiftHub</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/discover"
              className={pathname === "/discover" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Discover
            </Link>
            <Link
              href="/balance"
              className={pathname === "/balance" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Check Balance
            </Link>
            <Link
              href="/business"
              className={pathname === "/business" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              For Business
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}