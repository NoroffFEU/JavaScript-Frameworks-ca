// Matches the Online Shop model you pasted

export type Review = {
  id: string;
  username: string;
  rating: number; // integer
  description?: string;
};

export type ImageObj = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // float
  discountedPrice: number; // float
  image: ImageObj; // object { url, alt }
  rating: number; // integer
  tags: string[]; // Array<string>
  reviews: Review[]; // Array<Review>
};

// Generic “list” response wrapper from the docs
export type ApiListResponse<T> = {
  data: T[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
};

// Generic “single item” response wrapper
export type ApiItemResponse<T> = {
  data: T;
};

// UI-friendly types
export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  unitPrice: number;
  qty: number;
};
