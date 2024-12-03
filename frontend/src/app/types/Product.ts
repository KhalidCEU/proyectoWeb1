// types/Product.ts

export interface Comment {
    author: string;
    comment: string;
    date: Date;
}

export interface EstimatedPrice {
    minPrice: number;
    maxPrice: number;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    ratings: {
        userId: string;
        rating: number;
    }[];
    averageRating: number;
    imageUrl: string;
    isFavorite: boolean;
    estimatedPrice: EstimatedPrice;
    comments: Comment[];
  }