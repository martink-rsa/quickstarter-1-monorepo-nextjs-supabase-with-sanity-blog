import { BlogPostsSection } from '@/components/BlogPostsSection';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
        <Hero />
        <BlogPostsSection />
      </div>
    </Layout>
  );
}
