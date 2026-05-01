export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

export interface Seller extends CosmicObject {
  type: 'sellers';
  metadata: {
    name?: string;
    bio?: string;
    logo?: CosmicImage;
    location?: string;
    verified?: boolean;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_title?: string;
    description?: string;
    price?: number;
    sale_price?: number;
    main_image?: CosmicImage;
    gallery?: CosmicImage[];
    sizes?: string[];
    colors?: string[];
    stock_status?: string;
    featured?: boolean;
    category?: Category;
    seller?: Seller;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer_name?: string;
    rating?: number;
    review_text?: string;
    product?: Product;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}