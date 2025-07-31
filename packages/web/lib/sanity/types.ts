import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: { current: string };
  image?: Image & { alt?: string };
  bio?: PortableTextBlock[];
  email?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
}

export interface BlogPost {
  _id: string;
  _type: 'post';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  author: Author;
  mainImage?: Image & { alt?: string };
  categories?: Category[];
  tags?: string[];
  publishedAt: string;
  featured: boolean;
  readingTime?: number;
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogPostPreview {
  _id: string;
  _type: 'post';
  title: string;
  slug: { current: string };
  excerpt: string;
  author: Pick<Author, '_id' | 'name' | 'slug' | 'image'>;
  mainImage?: Image & { alt?: string };
  categories?: Pick<Category, '_id' | 'title' | 'slug' | 'color'>[];
  tags?: string[];
  publishedAt: string;
  featured: boolean;
  readingTime?: number;
}
