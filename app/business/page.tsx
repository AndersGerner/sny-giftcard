import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowRight 
} from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Gift Card Solutions for Business</h1>
          <p className="text-muted-foreground max-w-2xl">
            Boost your business with our comprehensive gift card management platform. 
            Increase sales, build customer loyalty, and streamline operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4">
            <BarChart3 className="h-12 w-12" />
            <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Track gift card sales, redemptions, and customer behavior with detailed analytics
            </p>
            <Button variant="ghost" className="group">
              Learn More 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <Users className="h-12 w-12" />
            <h3 className="text-lg font-semibold">Customer Management</h3>
            <p className="text-sm text-muted-foreground">
              Build customer relationships with personalized gift card programs
            </p>
            <Button variant="ghost" className="group">
              Learn More 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <CreditCard className="h-12 w-12" />
            <h3 className="text-lg font-semibold">Digital Gift Cards</h3>
            <p className="text-sm text-muted-foreground">
              Issue and manage digital gift cards with real-time tracking
            </p>
            <Button variant="ghost" className="group">
              Learn More 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}