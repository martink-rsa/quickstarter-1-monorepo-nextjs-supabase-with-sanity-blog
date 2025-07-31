import { urlFor } from '@/lib/sanity';
import type { BlogPostPreview } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPostPreview;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={cn(
        'group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow',
        featured && 'md:col-span-2'
      )}
    >
      <Link href={`/blog/${post.slug.current}`}>
        {/* Image */}
        {post.mainImage && (
          <div
            className={cn(
              'relative overflow-hidden bg-muted',
              featured ? 'h-64 md:h-80' : 'h-48'
            )}
          >
            <img
              src={urlFor(post.mainImage)
                .width(featured ? 800 : 400)
                .height(featured ? 320 : 200)
                .url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug.current}`}
                  className="text-xs font-medium text-primary hover:underline"
                  style={{ color: category.color }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {category.title}
                </Link>
              ))}
              {post.categories.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{post.categories.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h2
            className={cn(
              'font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2',
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            )}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            className={cn(
              'text-muted-foreground mb-4 line-clamp-3',
              featured ? 'text-base' : 'text-sm'
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(24).height(24).url()}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <Link
                  href={`/blog/author/${post.author.slug.current}`}
                  className="hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author.name}
                </Link>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </time>
            </div>
            {post.readingTime && (
              <span className="text-xs">{post.readingTime} min read</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
