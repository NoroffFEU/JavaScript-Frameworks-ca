// API model types

export type Review = {
  id: string;
  username: string;
  rating: number; // integer 0–5
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
  price: number;
  discountedPrice: number;
  image: ImageObj;
  rating: number;
  tags?: string[]; // tags are optional in some responses
  reviews?: Review[]; // optional array of reviews
};

// Generic “list” response wrapper from the Noroff docs
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
