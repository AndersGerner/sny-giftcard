import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import { GiftCard, Transaction } from './types';

// Cache for QR codes
const qrCodeCache = new Map<string, string>();

export async function generateGiftCard(amount: number, storeId: string): Promise<GiftCard> {
  const id = nanoid();
  const code = generateUniqueCode();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const qrCode = await generateQRCode(id);
  
  return {
    id,
    storeId,
    code,
    amount,
    balance: amount,
    qrCode,
    status: 'active',
    expiryDate: expiryDate.toISOString(),
    createdAt: new Date().toISOString(),
    transactions: []
  };
}

export async function checkBalance(code: string): Promise<number> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return 50.00; // Mock balance
}

export async function transferBalance(fromCardId: string, toCardId: string, amount: number): Promise<Transaction> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: nanoid(),
    giftCardId: fromCardId,
    type: 'transfer',
    amount,
    timestamp: new Date().toISOString(),
    metadata: {
      toCardId
    }
  };
}

function generateUniqueCode(): string {
  const prefix = 'GH';
  const timestamp = Date.now().toString(36).slice(-6);
  const random = Math.random().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

async function generateQRCode(cardId: string): Promise<string> {
  if (qrCodeCache.has(cardId)) {
    return qrCodeCache.get(cardId)!;
  }

  const qrData = JSON.stringify({
    id: cardId,
    timestamp: Date.now(),
    type: 'gift-card'
  });

  const qrCode = await QRCode.toDataURL(qrData, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 300
  });
  
  qrCodeCache.set(cardId, qrCode);
  return qrCode;
}

export function isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

export function isExpiringSoon(expiryDate: string, daysThreshold: number = 30): boolean {
  const expiryTime = new Date(expiryDate).getTime();
  const now = Date.now();
  const threshold = daysThreshold * 24 * 60 * 60 * 1000;
  return expiryTime - now < threshold;
}