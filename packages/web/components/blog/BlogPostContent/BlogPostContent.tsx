import { urlFor } from '@/lib/sanity';
import type { BlogPost } from '@/lib/sanity/types';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import type { Image as SanityImage } from 'sanity';

interface BlogPostContentProps {
  post: BlogPost;
}

interface ImageValue extends SanityImage {
  alt?: string;
  caption?: string;
}

interface ImageComponentProps {
  value: ImageValue;
}

const portableTextComponents = {
  types: {
    image: ({ value }: ImageComponentProps) => {
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-12 mb-4 leading-tight">
        {children}
      </h1>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 leading-tight">
        {children}
      </h4>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normal: ({ children }: any) => (
      <p className="text-base leading-relaxed mb-6">{children}</p>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-muted/50 rounded-r">
        <p className="text-lg italic leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={post.body} components={portableTextComponents} />
    </div>
  );
}
