import { BlogCard } from '@/components/blog/BlogCard/BlogCard';
import { client } from '@/lib/sanity';
import { featuredPostsQuery, postsQuery } from '@/lib/sanity/queries';
import type { BlogPostPreview } from '@/lib/sanity/types';
import Link from 'next/link';

async function getBlogPosts() {
  try {
    // Check if Sanity environment variables are configured
    if (
      !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      !process.env.NEXT_PUBLIC_SANITY_DATASET
    ) {
      console.log(
        'Sanity environment variables not configured, skipping blog posts'
      );
      return {
        featuredPosts: [],
        recentPosts: [],
      };
    }

    const [featuredPosts, recentPosts] = await Promise.all([
      client.fetch<BlogPostPreview[]>(featuredPostsQuery),
      client.fetch<BlogPostPreview[]>(postsQuery, { start: 0, end: 5 }),
    ]);

    return {
      featuredPosts: featuredPosts || [],
      recentPosts: recentPosts || [],
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      featuredPosts: [],
      recentPosts: [],
    };
  }
}

export async function BlogPostsSection() {
  const { featuredPosts, recentPosts } = await getBlogPosts();

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Latest from our blog
          </h2>
          <p className="text-muted-foreground mt-2">
            Stay updated with the latest insights and tutorials
          </p>
        </div>
        <Link href="/blog" className="text-primary hover:underline font-medium">
          View all posts →
        </Link>
      </div>

      {featuredPosts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Featured Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <BlogCard key={post._id} post={post} featured />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.slice(0, 6).map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
