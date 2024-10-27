import { GiftCard, Store, Transaction, Business } from './types';

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Target',
    description: 'Retail store offering a wide variety of products',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1593085260707-5377ba37f868?q=80&w=400&h=300&fit=crop',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
  },
  {
    id: '2',
    name: 'Starbucks',
    description: 'Coffee shop chain',
    category: 'Coffee & Tea',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400&h=300&fit=crop',
    location: {
      latitude: 40.7142,
      longitude: -74.0064,
      address: '456 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
  },
];

export const mockGiftCards: GiftCard[] = [
  {
    id: '1',
    code: 'GIFT-1234-5678',
    balance: 50.00,
    currency: 'USD',
    storeId: '1',
    userId: '1',
    status: 'active',
    expiryDate: '2025-12-31',
    createdAt: '2024-03-20',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    giftCardId: '1',
    amount: 50.00,
    type: 'purchase',
    status: 'completed',
    timestamp: '2024-03-20T10:00:00Z',
  },
];

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Target Corporation',
    storeIds: ['1'],
    analytics: {
      totalSales: 150000,
      activeCards: 3000,
      redemptionRate: 0.75,
    },
  },
];