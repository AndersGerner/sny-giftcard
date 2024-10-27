import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { GiftCard, Transaction } from '@/lib/api/types';
import { generateGiftCard, transferGiftCard, redeemGiftCard } from '@/lib/api/gift-cards';

export function useGiftCards() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const purchase = useCallback(async (storeId: string, amount: number) => {
    setIsLoading(true);
    try {
      const card = await generateGiftCard(storeId, amount);
      toast({
        title: 'Gift Card Purchased',
        description: `Card number: ${card.code}`,
      });
      return card;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to purchase gift card',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const transfer = useCallback(async (cardId: string, toUserId: string) => {
    setIsLoading(true);
    try {
      const transaction = await transferGiftCard(cardId, 'current-user', toUserId);
      toast({
        title: 'Gift Card Transferred',
        description: 'The gift card has been transferred successfully',
      });
      return transaction;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to transfer gift card',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const redeem = useCallback(async (cardId: string, amount: number, merchantId: string) => {
    setIsLoading(true);
    try {
      const transaction = await redeemGiftCard({
        giftCardId: cardId,
        amount,
        merchantId,
      });
      toast({
        title: 'Gift Card Redeemed',
        description: `Redeemed $${amount.toFixed(2)}`,
      });
      return transaction;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to redeem gift card',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    purchase,
    transfer,
    redeem,
    isLoading
  };
}