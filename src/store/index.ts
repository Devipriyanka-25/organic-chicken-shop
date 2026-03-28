"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Order, UserProfile, ChatMessage, SubscriptionItem } from "@/types";

/**
 * Cart Store for managing shopping cart state
 * Persists to localStorage
 */
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && quantity > 0 ? { ...i, quantity } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "organmeat-cart" }
  )
);

/**
 * User Store for managing user profile and authentication
 */
interface UserStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  updateUser: (data: Partial<UserProfile>) => void;
  logout: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    { name: "organmeat-user" }
  )
);

/**
 * Order Store for managing orders
 */
interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: string) => void;
  setCurrentOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      placeOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        })),
      getOrderById: (id) => get().orders.find((o) => o.id === id),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? { ...o, status: status as any, updatedAt: new Date().toISOString() }
              : o
          ),
        })),
      setCurrentOrder: (order) => set({ currentOrder: order }),
    }),
    { name: "organmeat-orders" }
  )
);

/**
 * Chat Store for managing chatbot messages
 */
interface ChatStore {
  messages: ChatMessage[];
  isOpen: boolean;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isOpen: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set({ messages: [] }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));

/**
 * Filter/UI Store for managing product filters and UI state
 */
interface FilterStore {
  selectedCategory: string;
  priceRange: [number, number];
  selectedCertifications: string[];
  sortBy: "price_asc" | "price_desc" | "popular" | "newest";
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setCertifications: (certs: string[]) => void;
  setSortBy: (sort: "price_asc" | "price_desc" | "popular" | "newest") => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: "all",
  priceRange: [0, 1000],
  selectedCertifications: [],
  sortBy: "popular",
  setCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setCertifications: (certs) => set({ selectedCertifications: certs }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () =>
    set({
      selectedCategory: "all",
      priceRange: [0, 1000],
      selectedCertifications: [],
      sortBy: "popular",
    }),
}));

/**
 * Subscription Store for managing subscription preferences
 */
interface SubscriptionStore {
  selectedPlanId: number | null;
  customItems: SubscriptionItem[];
  selectPlan: (planId: number) => void;
  setCustomItems: (items: SubscriptionItem[]) => void;
  clearSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  selectedPlanId: null,
  customItems: [],
  selectPlan: (planId) => set({ selectedPlanId: planId }),
  setCustomItems: (items) => set({ customItems: items }),
  clearSubscription: () =>
    set({
      selectedPlanId: null,
      customItems: [],
    }),
}));
