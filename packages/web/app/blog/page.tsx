import { Layout } from '@/components/Layout/Layout';
import { BlogCard } from '@/components/blog/BlogCard/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination/BlogPagination';
import { FeaturedPosts } from '@/components/blog/FeaturedPosts/FeaturedPosts';
import { client } from '@/lib/sanity';
import {
  featuredPostsQuery,
  postsCountQuery,
  postsQuery,
} from '@/lib/sanity/queries';
import type { BlogPostPreview } from '@/lib/sanity/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and stories from our team.',
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 12;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1', 10);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalPosts, featuredPosts] = await Promise.all([
    client.fetch<BlogPostPreview[]>(postsQuery, { start, end }),
    client.fetch<number>(postsCountQuery),
    client.fetch<BlogPostPreview[]>(featuredPostsQuery),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, tutorials, and stories from our team.
          </p>
        </div>

        {/* Featured Posts */}
        {page === 1 && featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">Featured Posts</h2>
            <Suspense fallback={<div>Loading featured posts...</div>}>
              <FeaturedPosts posts={featuredPosts} />
            </Suspense>
          </section>
        )}

        {/* All Posts */}
        <section>
          {page === 1 && (
            <h2 className="text-2xl font-semibold mb-8">Latest Posts</h2>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Check back later for new content.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <BlogPagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/blog"
                />
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
