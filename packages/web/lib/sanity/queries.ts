import { groq } from 'next-sanity';

// Common fields for author
const authorFields = groq`
  _id,
  name,
  slug,
  image {
    ...,
    alt
  }
`;

// Common fields for category
const categoryFields = groq`
  _id,
  title,
  slug,
  color
`;

// Fields for blog post previews
const postPreviewFields = groq`
  _id,
  title,
  slug,
  excerpt,
  author->{${authorFields}},
  mainImage {
    ...,
    alt
  },
  categories[]->{${categoryFields}},
  tags,
  publishedAt,
  featured,
  readingTime
`;

// Full blog post fields
const postFields = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  author->{
    ${authorFields},
    bio,
    email,
    website,
    twitter,
    linkedin
  },
  mainImage {
    ...,
    alt
  },
  categories[]->{
    ${categoryFields},
    description
  },
  tags,
  publishedAt,
  featured,
  readingTime,
  body,
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
`;

// Get all published blog posts with pagination
export const postsQuery = groq`
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [$start..$end] {
    ${postPreviewFields}
  }
`;

// Get total count of published posts
export const postsCountQuery = groq`
  count(*[_type == "post" && publishedAt <= now()])
`;

// Get featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && publishedAt <= now() && featured == true] | order(publishedAt desc) [0..2] {
    ${postPreviewFields}
  }
`;

// Get single post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`;

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && publishedAt <= now() && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [$start..$end] {
    ${postPreviewFields}
  }
`;

// Get count of posts by category
export const postsByCategoryCountQuery = groq`
  count(*[_type == "post" && publishedAt <= now() && $categorySlug in categories[]->slug.current])
`;

// Get posts by author
export const postsByAuthorQuery = groq`
  *[_type == "post" && publishedAt <= now() && author->slug.current == $authorSlug] | order(publishedAt desc) [$start..$end] {
    ${postPreviewFields}
  }
`;

// Get count of posts by author
export const postsByAuthorCountQuery = groq`
  count(*[_type == "post" && publishedAt <= now() && author->slug.current == $authorSlug])
`;

// Get posts by tag
export const postsByTagQuery = groq`
  *[_type == "post" && publishedAt <= now() && $tag in tags] | order(publishedAt desc) [$start..$end] {
    ${postPreviewFields}
  }
`;

// Get count of posts by tag
export const postsByTagCountQuery = groq`
  count(*[_type == "post" && publishedAt <= now() && $tag in tags])
`;

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    ${categoryFields},
    description,
    "postCount": count(*[_type == "post" && publishedAt <= now() && ^._id in categories[]._ref])
  }
`;

// Get single category by slug
export const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryFields},
    description
  }
`;

// Get all authors
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    ${authorFields},
    bio,
    email,
    website,
    twitter,
    linkedin,
    "postCount": count(*[_type == "post" && publishedAt <= now() && author._ref == ^._id])
  }
`;

// Get single author by slug
export const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    ${authorFields},
    bio,
    email,
    website,
    twitter,
    linkedin
  }
`;

// Get all unique tags with post counts
export const tagsQuery = groq`
  *[_type == "post" && publishedAt <= now()] {
    tags
  } | {
    "tag": tags[],
    "count": count(*[_type == "post" && publishedAt <= now() && ^.tag in tags])
  } | order(count desc)
`;

// Search posts by title or content
export const searchPostsQuery = groq`
  *[_type == "post" && publishedAt <= now() && (
    title match "*" + $searchTerm + "*" ||
    excerpt match "*" + $searchTerm + "*" ||
    pt::text(body) match "*" + $searchTerm + "*"
  )] | order(publishedAt desc) [$start..$end] {
    ${postPreviewFields}
  }
`;

// Get related posts (same category, excluding current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && publishedAt <= now() && _id != $postId && count(categories[@._ref in *[_type == "post" && _id == $postId][0].categories[]._ref]) > 0] | order(publishedAt desc) [0..2] {
    ${postPreviewFields}
  }
`;

// Get post paths for static generation
export const postPathsQuery = groq`
  *[_type == "post" && publishedAt <= now()].slug.current
`;

// Get sitemap data
export const sitemapQuery = groq`
  {
    "posts": *[_type == "post" && publishedAt <= now()] {
      slug,
      _updatedAt,
      publishedAt
    },
    "categories": *[_type == "category"] {
      slug,
      _updatedAt
    },
    "authors": *[_type == "author"] {
      slug,
      _updatedAt
    }
  }
`;
