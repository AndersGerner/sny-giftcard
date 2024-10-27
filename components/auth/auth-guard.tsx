"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireBusiness?: boolean;
}

export function AuthGuard({
  children,
  requireAuth = false,
  requireBusiness = false,
}: AuthGuardProps) {
  const { isAuthenticated, isBusiness } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    }

    if (requireBusiness && !isBusiness) {
      router.push("/");
    }
  }, [isAuthenticated, isBusiness, requireAuth, requireBusiness, router, pathname]);

  if ((requireAuth && !isAuthenticated) || (requireBusiness && !isBusiness)) {
    return null;
  }

  return <>{children}</>;
}