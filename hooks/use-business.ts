"use client";

import { useState } from 'react';
import { Business, Transaction } from '@/lib/api/types';
import * as api from '@/lib/api/business';

export function useBusiness() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAnalytics = async (businessId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const analytics = await api.getBusinessAnalytics(businessId);
      return analytics;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get analytics');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactions = async (businessId: string, startDate: string, endDate: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const transactions = await api.getBusinessTransactions(businessId, startDate, endDate);
      return transactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get transactions');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getAnalytics,
    getTransactions,
  };
}