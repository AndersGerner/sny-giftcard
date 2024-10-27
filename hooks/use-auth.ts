"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

interface RegisterData {
  email: string;
  password: string;
  name: string;
  businessName?: string;
  type: "customer" | "business";
}

export function useAuth() {
  const router = useRouter();
  const { user, setUser, setToken, logout: storeLogout } = useAuthStore();
  const { toast } = useToast();

  const login = async (
    email: string,
    password: string,
    type: "customer" | "business"
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: "John Doe",
        type,
        businessName: type === "business" ? "Acme Inc" : undefined,
      };
      const mockToken = "mock-jwt-token";

      setUser(mockUser);
      setToken(mockToken);

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        type: data.type,
        businessName: data.businessName,
      };
      const mockToken = "mock-jwt-token";

      setUser(mockUser);
      setToken(mockToken);

      toast({
        title: "Welcome to GiftHub!",
        description: "Your account has been created successfully.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    storeLogout();
    router.push("/");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return {
    user,
    isAuthenticated: !!user,
    isCustomer: user?.type === "customer",
    isBusiness: user?.type === "business",
    login,
    register,
    logout,
  };
}