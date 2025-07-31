import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { client, urlFor } from '@/lib/sanity';
import {
  authorQuery,
  postsByAuthorCountQuery,
  postsByAuthorQuery,
} from '@/lib/sanity/queries';
import type { Author, BlogPostPreview } from '@/lib/sanity/types';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

const POSTS_PER_PAGE = 12;

export async function generateStaticParams() {
  const authors = await client.fetch<string[]>(
    `*[_type == "author"].slug.current`
  );

  return authors.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const author = await client.fetch<Author>(authorQuery, { slug: params.slug });

  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }

  return {
    title: `${author.name} - Blog Authors`,
    description: `Posts by ${author.name}`,
  };
}

export default async function AuthorPage({
  params,
  searchParams,
}: AuthorPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [author, posts, totalPosts] = await Promise.all([
    client.fetch<Author>(authorQuery, { slug: params.slug }),
    client.fetch<BlogPostPreview[]>(postsByAuthorQuery, {
      authorSlug: params.slug,
      start,
      end,
    }),
    client.fetch<number>(postsByAuthorCountQuery, { authorSlug: params.slug }),
  ]);

  if (!author) {
    notFound();
  }

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Author Header */}
      <div className="mb-12">
        <div className="flex items-start gap-6 mb-6">
          {author.image && (
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={urlFor(author.image).width(96).height(96).url()}
                alt={author.image.alt || author.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">
              {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
            </p>
            {author.bio && (
              <div className="prose prose-sm text-muted-foreground">
                <PortableText value={author.bio} />
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(author.website || author.twitter || author.linkedin) && (
          <div className="flex gap-4 text-sm">
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Website
              </a>
            )}
            {author.twitter && (
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Twitter
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            This author hasn&apos;t published any posts yet.
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
              basePath={`/blog/author/${params.slug}`}
            />
          )}
        </>
      )}
    </div>
  );
}

// Enable ISR with revalidation
export const revalidate = 3600;
