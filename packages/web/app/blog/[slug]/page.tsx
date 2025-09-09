import { Layout } from '@/components/Layout/Layout';
import { BlogPostContent } from '@/components/blog/BlogPostContent/BlogPostContent';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader/BlogPostHeader';
import { RelatedPosts } from '@/components/blog/RelatedPosts/RelatedPosts';
import { client, urlFor } from '@/lib/sanity';
import {
  postPathsQuery,
  postQuery,
  relatedPostsQuery,
} from '@/lib/sanity/queries';
import type { BlogPost, BlogPostPreview } from '@/lib/sanity/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postPathsQuery);

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost>(postQuery, { slug });

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.excerpt;
  const keywords = post.seo?.keywords || post.tags;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords?.join(', '),
    ...(post.author && { authors: [{ name: post.author.name }] }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      ...(post.author && { authors: [post.author.name] }),
      tags: post.tags,
      ...(post.mainImage && {
        images: [
          {
            url: urlFor(post.mainImage).width(1200).height(630).url(),
            alt: post.mainImage.alt || post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      ...(post.mainImage && {
        images: [urlFor(post.mainImage).width(1200).height(630).url()],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    client.fetch<BlogPost>(postQuery, { slug }),
    client.fetch<BlogPostPreview[]>(relatedPostsQuery, {
      postId: '',
      slug,
    }),
  ]);

  if (!post) {
    notFound();
  }

  // Update related posts query with actual post ID
  const actualRelatedPosts = await client.fetch<BlogPostPreview[]>(
    relatedPostsQuery,
    {
      postId: post._id,
    }
  );

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <BlogPostHeader post={post} />
        <BlogPostContent post={post} />

        {actualRelatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <RelatedPosts posts={actualRelatedPosts} />
          </div>
        )}
      </article>
    </Layout>
  );
}

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour
