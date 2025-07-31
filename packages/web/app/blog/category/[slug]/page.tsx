import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { client } from '@/lib/sanity';
import {
  categoriesQuery,
  categoryQuery,
  postsByCategoryCountQuery,
  postsByCategoryQuery,
} from '@/lib/sanity/queries';
import type { BlogPostPreview, Category } from '@/lib/sanity/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

const POSTS_PER_PAGE = 12;

export async function generateStaticParams() {
  const categories = await client.fetch<Pick<Category, 'slug'>[]>(
    `*[_type == "category"].slug.current`
  );

  return categories.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await client.fetch<Category>(categoryQuery, {
    slug: params.slug,
  });

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.title} - Blog Categories`,
    description:
      category.description || `Posts in the ${category.title} category.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [category, posts, totalPosts] = await Promise.all([
    client.fetch<Category>(categoryQuery, { slug: params.slug }),
    client.fetch<BlogPostPreview[]>(postsByCategoryQuery, {
      categorySlug: params.slug,
      start,
      end,
    }),
    client.fetch<number>(postsByCategoryCountQuery, {
      categorySlug: params.slug,
    }),
  ]);

  if (!category) {
    notFound();
  }

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{category.title}</h1>
          {category.color && (
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
          )}
        </div>
        {category.description && (
          <p className="text-xl text-muted-foreground">
            {category.description}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            No posts have been published in this category yet.
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
              basePath={`/blog/category/${params.slug}`}
            />
          )}
        </>
      )}
    </div>
  );
}

// Enable ISR with revalidation
export const revalidate = 3600;
