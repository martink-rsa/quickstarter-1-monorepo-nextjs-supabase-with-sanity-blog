import { BlogPostsSection } from '@/components/BlogPostsSection/BlogPostsSection';
import { Hero } from '@/components/Hero/Hero';
import { Layout } from '@/components/Layout/Layout';

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
