import { Store } from "./api/types";

export const mockStores: Store[] = [
  {
    id: "1",
    name: "Urban Outfitters",
    description: "Contemporary clothing, accessories, and home goods retailer with a hip, youthful aesthetic.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    category: "Fashion & Apparel",
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: "628 Broadway, New York, NY 10012"
    }
  },
  {
    id: "2",
    name: "The Coffee House",
    description: "Artisanal coffee shop serving specialty drinks and fresh pastries in a cozy atmosphere.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    category: "Food & Beverage",
    location: {
      latitude: 40.7112,
      longitude: -74.0055,
      address: "154 Prince St, New York, NY 10012"
    }
  },
  {
    id: "3",
    name: "Tech Haven",
    description: "Premium electronics and gadgets store with expert staff and the latest innovations.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    category: "Electronics",
    location: {
      latitude: 40.7116,
      longitude: -74.0045,
      address: "233 Spring St, New York, NY 10013"
    }
  }
];