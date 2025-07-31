import type { BlogPostPreview } from '@/lib/sanity/types';

import { BlogCard } from './BlogCard';

interface FeaturedPostsProps {
  posts: BlogPostPreview[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  const [mainPost, ...otherPosts] = posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BlogCard post={mainPost} featured />
      {otherPosts.length > 0 && (
        <div className="grid gap-6">
          {otherPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
