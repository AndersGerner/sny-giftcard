export interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface GiftCard {
  id: string;
  storeId: string;
  amount: number;
  balance: number;
  code: string;
  qrCode: string;
  status: 'active' | 'used' | 'expired';
  expiryDate: string;
  createdAt: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  giftCardId: string;
  type: 'purchase' | 'redemption' | 'transfer';
  amount: number;
  timestamp: string;
  metadata?: {
    location?: string;
    merchantId?: string;
    transferredTo?: string;
  };
}

export interface RedemptionRequest {
  giftCardId: string;
  amount: number;
  merchantId: string;
  location?: string;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  storeIds: string[];
  analytics: {
    totalSales: number;
    activeCards: number;
    redemptionRate: number;
  };
}