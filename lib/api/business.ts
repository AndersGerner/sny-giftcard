import { Business, Transaction } from './types';
import { mockBusinesses, mockTransactions } from './mock-data';

export async function getBusinessAnalytics(businessId: string): Promise<Business['analytics']> {
  const business = mockBusinesses.find(b => b.id === businessId);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (business) {
        resolve(business.analytics);
      } else {
        reject(new Error('Business not found'));
      }
    }, 1000);
  });
}

export async function getBusinessTransactions(businessId: string, startDate: string, endDate: string): Promise<Transaction[]> {
  // In a real implementation, we would filter transactions by business ID and date range
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTransactions), 1000);
  });
}