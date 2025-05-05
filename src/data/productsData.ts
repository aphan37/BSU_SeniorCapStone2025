
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  dealEnds?: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for study and play",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ2OTgzOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
  },
  {
    id: "cat-2",
    name: "Smartphones",
    slug: "smartphones",
    description: "Stay connected with the latest phones",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ2OTk2NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
  },
  {
    id: "cat-3",
    name: "Audio",
    slug: "audio",
    description: "Headphones, earbuds, and speakers",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDAzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
  },
  {
    id: "cat-4",
    name: "Accessories",
    slug: "accessories",
    description: "Essential add-ons for your devices",
    image: "https://images.unsplash.com/photo-1617043786394-ae6e1f62833e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDA3MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
  }
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "MacBook Air M2",
    brand: "Apple",
    category: "laptops",
    originalPrice: 999,
    discountedPrice: 849,
    discountPercentage: 15,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDEyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "The incredibly thin and light MacBook Air is now more powerful with the Apple M2 chip. Student discount available!",
    features: [
      "Apple M2 chip",
      "13.6-inch Liquid Retina display",
      "8GB unified memory",
      "256GB SSD storage",
      "18 hours battery life"
    ],
    rating: 4.8,
    reviewCount: 152,
    inStock: true,
    isNew: true,
    isFeatured: true,
    dealEnds: new Date("2025-06-01")
  },
  {
    id: "prod-2",
    name: "Dell XPS 13",
    brand: "Dell",
    category: "laptops",
    originalPrice: 1199,
    discountedPrice: 999,
    discountPercentage: 17,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDIxNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "The XPS 13 is a compact and powerful laptop with an InfinityEdge display and great performance.",
    features: [
      "12th Gen Intel Core i7",
      "13.4-inch FHD+ display",
      "16GB RAM",
      "512GB SSD",
      "Intel Iris Xe Graphics"
    ],
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    category: "smartphones",
    originalPrice: 799,
    discountedPrice: 679,
    discountPercentage: 15,
    image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDUzNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "Experience epic with the Samsung Galaxy S23 featuring powerful performance and an amazing camera system.",
    features: [
      "6.1-inch Dynamic AMOLED 2X display",
      "Triple camera system",
      "8GB RAM",
      "128GB storage",
      "3,900mAh battery"
    ],
    rating: 4.6,
    reviewCount: 83,
    inStock: true,
    isNew: true,
    isFeatured: true,
    dealEnds: new Date("2025-05-20")
  },
  {
    id: "prod-4",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "audio",
    originalPrice: 399,
    discountedPrice: 299,
    discountPercentage: 25,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDU5OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "Industry-leading noise cancellation with premium comfort and sound quality.",
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Crystal clear calls",
      "Touch controls",
      "Multipoint connection"
    ],
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: "prod-5",
    name: "iPad Air",
    brand: "Apple",
    category: "tablets",
    originalPrice: 599,
    discountedPrice: 499,
    discountPercentage: 17,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDY2MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "Serious performance in a thin and light design with the Apple M1 chip.",
    features: [
      "10.9-inch Liquid Retina display",
      "Apple M1 chip",
      "Touch ID",
      "12MP Wide camera",
      "USB-C connector"
    ],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: "prod-6",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "accessories",
    originalPrice: 99,
    discountedPrice: 79,
    discountPercentage: 20,
    image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDc2MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "Advanced wireless mouse with ultra-fast scrolling and ergonomic design.",
    features: [
      "8,000 DPI sensor",
      "Quiet clicks",
      "Ergonomic design",
      "USB-C quick charging",
      "Works on any surface"
    ],
    rating: 4.7,
    reviewCount: 92,
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: "prod-7",
    name: "Google Pixel 7",
    brand: "Google",
    category: "smartphones",
    originalPrice: 599,
    discountedPrice: 499,
    discountPercentage: 17,
    image: "https://images.unsplash.com/photo-1667604611517-99985f8eee56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDgwOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "The Google phone that adapts to you with Google Tensor G2 and the most advanced Pixel camera.",
    features: [
      "Google Tensor G2 processor",
      "6.3-inch display",
      "Dual camera system",
      "8GB RAM",
      "24-hour battery life"
    ],
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: "prod-8",
    name: "Samsung T7 SSD",
    brand: "Samsung",
    category: "accessories",
    originalPrice: 129,
    discountedPrice: 89,
    discountPercentage: 31,
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ3MDg3OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    description: "Portable SSD with lightning fast transfer speeds in a pocket-sized design.",
    features: [
      "1TB storage",
      "Transfer speeds up to 1,050 MB/s",
      "Password protection",
      "Shock resistant",
      "USB 3.2 Gen 2"
    ],
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    isNew: false,
    isFeatured: false
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
