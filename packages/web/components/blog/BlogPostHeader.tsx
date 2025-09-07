import { urlFor } from '@/lib/sanity';
import type { BlogPost } from '@/lib/sanity/types';
import { format } from 'date-fns';
import Link from 'next/link';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="mb-12">
      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category) => (
            <Link
              key={category._id}
              href={`/blog/category/${category.slug.current}`}
              className="text-sm font-medium text-primary hover:underline px-2 py-1 bg-primary/10 rounded"
              style={{
                color: category.color,
                backgroundColor: `${category.color}20`,
              }}
            >
              {category.title}
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
        {post.excerpt}
      </p>

      {/* Author and Meta */}
      <div className="flex items-center justify-between border-b pb-8 mb-8">
        <div className="flex items-center gap-4">
          {post.author?.image ? (
            <img
              src={urlFor(post.author.image).width(64).height(64).url()}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {post.author?.name?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
          )}
          <div>
            {post.author ? (
              <Link
                href={`/blog/author/${post.author.slug.current}`}
                className="text-lg font-semibold hover:text-primary transition-colors"
              >
                {post.author.name}
              </Link>
            ) : (
              <span className="text-lg font-semibold">Anonymous</span>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Featured Image */}
      {post.mainImage && (
        <div className="mb-12 rounded-lg overflow-hidden">
          <img
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.mainImage.alt || post.title}
            className="w-full h-auto"
          />
          {post.mainImage.alt && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {post.mainImage.alt}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
