import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'customer' | 'business';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, token: null, error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface GiftCardState {
  cards: GiftCard[];
  setCards: (cards: GiftCard[]) => void;
  addCard: (card: GiftCard) => void;
  removeCard: (cardId: string) => void;
}

export const useGiftCardStore = create<GiftCardState>()(
  persist(
    (set) => ({
      cards: [],
      setCards: (cards) => set({ cards }),
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      removeCard: (cardId) => 
        set((state) => ({ 
          cards: state.cards.filter((card) => card.id !== cardId) 
        })),
    }),
    {
      name: 'gift-card-storage',
    }
  )
);

interface GiftCard {
  id: string;
  storeId: string;
  amount: number;
  balance: number;
  code: string;
  expiryDate: string;
  status: 'active' | 'used' | 'expired';
}